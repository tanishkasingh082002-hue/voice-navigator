# Robust HTTP Server in PowerShell for YojanaVaani
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()
Write-Host "YojanaVaani Server running at http://localhost:$port/"

$root = $PSScriptRoot

try {
    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $localPath = $request.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($localPath)) {
                $localPath = "index.html"
            }

            $filePath = Join-Path $root $localPath

            if (Test-Path $filePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                
                if ($filePath.EndsWith(".html")) {
                    $response.ContentType = "text/html; charset=utf-8"
                } elseif ($filePath.EndsWith(".css")) {
                    $response.ContentType = "text/css; charset=utf-8"
                } elseif ($filePath.EndsWith(".js")) {
                    $response.ContentType = "application/javascript; charset=utf-8"
                } elseif ($filePath.EndsWith(".json")) {
                    $response.ContentType = "application/json; charset=utf-8"
                } else {
                    $response.ContentType = "application/octet-stream"
                }

                $response.StatusCode = 200
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.OutputStream.Write($notFound, 0, $notFound.Length)
            }
            $response.Close()
        } catch {
            Write-Host "Request error: $_"
        }
    }
} finally {
    $listener.Stop()
}
