FROM mcr.microsoft.com/dotnet/aspnet:8.0 

WORKDIR /app

COPY /app/publish ./

EXPOSE 5033

ENTRYPOINT ["dotnet", "API.dll"]