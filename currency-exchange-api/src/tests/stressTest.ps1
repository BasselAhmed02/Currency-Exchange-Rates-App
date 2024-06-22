# Loop 50 times to simulate multiple API requests
1..50 | ForEach-Object {
    try {
        # Attempt to make an HTTP GET request to the API endpoint
        Invoke-RestMethod -Uri "http://localhost:3000/api/exchange-rate?from=USD&to=EUR"
    } catch {
        # If an exception occurs during the API request, log the error message
        Write-Host "Error: $($_.Exception.Message)"
    }
    
    # Pause script execution for 1 millisecond to control request rate
    Start-Sleep -Milliseconds 1
}
