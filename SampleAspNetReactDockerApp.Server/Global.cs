namespace SampleAspNetReactDockerApp.Server;

/// <summary>
/// Global class for accessing environment variables and other global settings
/// </summary>
public static class Global
{
    /// <summary>
    /// Configuration property for accessing environment variables
    /// </summary>
    public static IConfiguration? Configuration { get; set; }
    
    /// <summary>
    /// Returns true if the application is running in a container
    /// </summary>
    public static bool RunsInContainer => Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";
    
    /// <summary>
    /// Accesses an environment variable
    /// </summary>
    /// <param name="variable"></param>
    /// <returns></returns>
    /// <exception cref="InvalidOperationException"></exception>
    /// <exception cref="ArgumentOutOfRangeException"></exception>
    public static string AccessAppEnvironmentVariable(AppEnvironmentVariables variable)
    {
        switch (variable)
        {
            case AppEnvironmentVariables.AppDb:
                
                if (RunsInContainer)
                {
                    var possibleValue = Environment.GetEnvironmentVariable("ASPNETCORE_APP_DB");
                    
                    if (!string.IsNullOrEmpty(possibleValue))
                        return possibleValue;
                }
                
                return Configuration?["ConnectionStrings:AppDb"] 
                       ?? throw new InvalidOperationException($"Environment variable {variable} not found");
            case AppEnvironmentVariables.ClientAppPorts:
                if (RunsInContainer)
                {
                    var possibleValue = Environment.GetEnvironmentVariable("CLIENT_APP_PORTS");
                    
                    if (!string.IsNullOrEmpty(possibleValue))
                        return possibleValue;
                }
                return Configuration?["ClientAppPorts"] 
                       ?? throw new InvalidOperationException($"Environment variable {variable} not found");
            case AppEnvironmentVariables.ShowSwaggerInProduction:
                if (RunsInContainer)
                {
                    var possibleValue = Environment.GetEnvironmentVariable("ASPNETCORE_SHOW_SWAGGER_IN_PRODUCTION");
                    
                    if (!string.IsNullOrEmpty(possibleValue))
                        return possibleValue;
                }
                return Configuration?["ShowSwaggerInProduction"] 
                       ?? throw new InvalidOperationException($"Environment variable {variable} not found");
            case AppEnvironmentVariables.DeleteDbIfExistsOnStartup:
                return Configuration?["DeleteDbIfExistsOnStartup"] 
                       ?? throw new InvalidOperationException($"Environment variable {variable} not found");
            default:
                throw new ArgumentOutOfRangeException(nameof(variable), variable, null);
        }
    }
    
}

/// <summary>
/// Enumeration of environment variables used by the application
/// </summary>
public enum AppEnvironmentVariables
{
    /// <summary>
    /// The connection string for the application database
    /// </summary>
    /// <example>
    /// Server=localhost;Database=AppDb;User Id=sa;Password=your_password...
    /// </example>
    AppDb,
    /// <summary>
    /// The ports used by the client application
    /// </summary>
    /// <example>
    /// 3000:80
    /// </example>
    ClientAppPorts,
    /// <summary>
    /// The environment variable that determines whether to show Swagger in production
    /// </summary>
    /// <example>
    /// true
    /// </example>
    ShowSwaggerInProduction,
    /// <summary>
    /// The environment variable that determines whether to delete the database if it exists on startup
    /// </summary>
    DeleteDbIfExistsOnStartup
}