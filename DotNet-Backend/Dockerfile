FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder

WORKDIR /src

COPY *.csproj ./

RUN dotnet restore 

COPY . ./

RUN dotnet publish -c Release -o /app/publish 

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=builder /app/publish ./

EXPOSE 5033

ENTRYPOINT ["dotnet", "API.dll"]