# Etapa 1: build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia tudo que está na pasta backend (onde está o Dockerfile)
COPY . .

# Restaura dependências
RUN dotnet restore

# Compila e publica
RUN dotnet publish -c Release -o /app/publish

# Etapa 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copia arquivos da publicação
COPY --from=build /app/publish .

# Porta exposta (opcional no Render)
EXPOSE 80

# Executa a aplicação (substitua se seu .csproj tiver outro nome)
ENTRYPOINT ["dotnet", "backend.dll"]