# Etapa 1: build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia todos os arquivos da pasta backend (onde este Dockerfile está)
COPY . .

# Restaura dependências
RUN dotnet restore

# Compila e publica a aplicação
RUN dotnet publish -c Release -o /app/publish

# Etapa 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copia arquivos publicados do build
COPY --from=build /app/publish .

# Expõe a porta padrão (opcional no Render)
EXPOSE 80

# Ponto de entrada da aplicação
ENTRYPOINT ["dotnet", "backend.dll"]


