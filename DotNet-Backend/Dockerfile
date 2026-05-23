FROM mcr.microsoft.com/dotnet/aspnet:8.0 

WORKDIR /app

COPY ./build-output .

EXPOSE 5033

ENTRYPOINT ["dotnet", "API.dll"]