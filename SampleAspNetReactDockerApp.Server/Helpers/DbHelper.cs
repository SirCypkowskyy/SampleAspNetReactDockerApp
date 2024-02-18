using SampleAspNetReactDockerApp.Server.Data;

namespace SampleAspNetReactDockerApp.Server.Helpers;

/// <summary>
/// Helper class for database operations
/// </summary>
public static class DbHelper
{
    /// <summary>
    /// Ensures that the database is created
    /// </summary>
    /// <param name="scope"></param>
    /// <param name="deleteIfExists">
    /// If true, the database will be deleted if it exists
    /// </param>
    public static async Task EnsureDbIsCreatedAsync(AsyncServiceScope scope, bool deleteIfExists = false)
    {
        await using var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        if(deleteIfExists)
            await dbContext.Database.EnsureDeletedAsync();
        
        await dbContext.Database.EnsureCreatedAsync();
    }
}