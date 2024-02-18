# SampleAspNetReactDockerApp.Server

This is the server side of the SampleAspNetReactDockerApp. It is a .NET 8.0 Web API project.

## Table of Contents

- [Getting Started](#getting-started)
- [NuGet Packages](#nuget-packages)
- [Docker](#docker)

## Getting Started

To run the server, you will need to have the .NET 8.0 SDK installed. You can download it from the [official .NET website](https://dotnet.microsoft.com/download).

Once you have the .NET SDK installed, you can run the application using the following command:

```bash
dotnet run http
```

This will start the server on port 5136. You can then navigate to `http://localhost:5136/swagger` to see the OpenAPI documentation for the API.

If you want to run just the server app in the Docker production mode, you can use the following command in the parent directory:

```bash
docker compose --env-file ./.env up -d app-api
```

## NuGet Packages

- [Microsoft.AspNetCore.SpaProxy](https://www.nuget.org/packages/Microsoft.AspNetCore.SpaProxy) - this package is a helper for launching launching the SPA CLI proxy automatically when the application starts in ASP.NET.
- [Swashbuckle.AspNetCore](https://www.nuget.org/packages/Swashbuckle.AspNetCore) - this package is used to generate OpenAPI documentation for the API.
- [Swashbuckle.AspNetCore.Annotations](https://www.nuget.org/packages/Swashbuckle.AspNetCore.Annotations) - this package is used to add Swagger annotations to the API controllers (e.g. use class documentation to generate the OpenAPI documentation).
- [Swashbuckle.AspNetCore.Versioning](https://www.nuget.org/packages/Swashbuckle.AspNetCore.Versioning) - this package is used to add versioning to the OpenAPI documentation.
- [Npgsql.EntityFrameworkCore.PostgreSQL](https://www.nuget.org/packages/Npgsql.EntityFrameworkCore.PostgreSQL) - this package is used to connect to a PostgreSQL database using Entity Framework Core.
- [Serilog](https://www.nuget.org/packages/Serilog) - this package is used to log messages to the console and to a files.
- [Microsoft.AspNetCore.Identity.EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity.EntityFrameworkCore) - this package is used to add Identity to the application.

## Docker

The server is configured to run in a Docker container. The Dockerfile is located in the root of the project. The server is configured to run on port 5000.