FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SampleAspNetReactDockerApp.Server/SampleAspNetReactDockerApp.Server.csproj", "SampleAspNetReactDockerApp.Server/"]
COPY ["sampleaspnetreactdockerapp.client/SampleAspNetReactDockerApp.Client.esproj", "sampleaspnetreactdockerapp.client/"]
RUN dotnet restore "SampleAspNetReactDockerApp.Server/SampleAspNetReactDockerApp.Server.csproj"
COPY . .
WORKDIR "/src/SampleAspNetReactDockerApp.Server"
RUN dotnet build "SampleAspNetReactDockerApp.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "SampleAspNetReactDockerApp.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SampleAspNetReactDockerApp.Server.dll"]
