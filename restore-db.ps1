# restore-db.ps1
# Restaura la base de datos desde uno de los archivos generados por backup-db.ps1.
# ADVERTENCIA: esto SOBRESCRIBE lo que haya ahora mismo en la base de datos.
# Correr desde la raiz del proyecto (donde esta docker-compose.yml y el .env),
# con Docker corriendo.
#
# Uso:  .\restore-db.ps1 .\backups\backup_2026-09-02_1400.sql

param(
    [Parameter(Mandatory = $true)]
    [string]$Archivo
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".env")) {
    Write-Host "No encuentro el archivo .env en esta carpeta. Corre este script desde la raiz del proyecto." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $Archivo)) {
    Write-Host "No encuentro el archivo de backup: $Archivo" -ForegroundColor Red
    exit 1
}

$envVars = @{}
Get-Content ".env" | Where-Object { $_ -match '^\s*[A-Za-z_]+\s*=' } | ForEach-Object {
    $parts = $_ -split '=', 2
    $envVars[$parts[0].Trim()] = $parts[1].Trim()
}

$usuario = $envVars['POSTGRES_USER']
$baseDatos = $envVars['POSTGRES_DB']

if (-not $usuario -or -not $baseDatos) {
    Write-Host "No encontre POSTGRES_USER o POSTGRES_DB en el .env." -ForegroundColor Red
    exit 1
}

Write-Host "Vas a RESTAURAR '$Archivo' sobre la base '$baseDatos'." -ForegroundColor Yellow
Write-Host "Esto reemplaza los datos que haya ahora mismo. ¿Seguro? (escribe 'si' para continuar)" -ForegroundColor Yellow
$confirmacion = Read-Host
if ($confirmacion -ne "si") {
    Write-Host "Cancelado." -ForegroundColor Cyan
    exit 0
}

Get-Content $Archivo | docker compose exec -T db psql -U $usuario -d $baseDatos

if ($LASTEXITCODE -eq 0) {
    Write-Host "Restauracion completada." -ForegroundColor Green
} else {
    Write-Host "Algo fallo durante la restauracion. Revisa el mensaje de arriba." -ForegroundColor Red
}
