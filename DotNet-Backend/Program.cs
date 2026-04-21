using API.Data;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;

var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------------------
// 🟦 Configure MySQL DbContext with retry during runtime
// -------------------------------------------------------
var serverVersion = new MySqlServerVersion(new Version(8, 0, 0));

string host = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
string port = Environment.GetEnvironmentVariable("DB_PORT") ?? "3306";
string dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "myapp";
string user = Environment.GetEnvironmentVariable("DB_USER") ?? "root";

// If password file is provided → read it
string passwordFile = Environment.GetEnvironmentVariable("DB_PASSWORD_FILE");
string password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "";

if (!string.IsNullOrEmpty(passwordFile) && File.Exists(passwordFile))
{
    password = File.ReadAllText(passwordFile).Trim();
}

// Construct connection string
string connectionString =
    $"Server={host};Port={port};Database={dbName};User Id={user};Password={password};";

// ----------------------------
// DB connection
// ----------------------------


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, serverVersion,
        mySqlOptions =>
        {
            // Enable retries for transient MySQL failures
            mySqlOptions.EnableRetryOnFailure(
                maxRetryCount: 10,
                maxRetryDelay: TimeSpan.FromSeconds(3),
                errorNumbersToAdd: null
            );
        }
    )
);

// ----------------------------
// Add Controllers & Swagger
// ----------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// -------------------------------------------------------
// 🔥 Apply migrations with retry during application startup
// -------------------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    const int maxRetries = 10;
    int retry = 0;

    while (true)
    {
        try
        {
            Console.WriteLine("⏳ Applying migrations...");
            db.Database.Migrate();
            Console.WriteLine("✅ Migrations applied successfully!");
            break;
        }
        catch (Exception ex)
        {
            retry++;
            Console.WriteLine($"⛔ Migration failed ({retry}/{maxRetries}). DB is not ready. Error: {ex.Message}");

            if (retry >= maxRetries)
                throw;   // give up if DB does not start

            await Task.Delay(3000); // wait then retry
        }
    }
}

// ----------------------------
// HTTP Request Pipeline
// ----------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
