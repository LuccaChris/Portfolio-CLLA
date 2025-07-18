
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./

ENTRYPOINT ["dotnet", "backend.dll"]
# Etapa 1: build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia o conteúdo do projeto
COPY ./backend ./backend
WORKDIR /src/backend

# Restaura dependências
RUN dotnet restore

# Compila e publica a aplicação
RUN dotnet publish -c Release -o /app/publish

# Etapa 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copia arquivos publicados do build
COPY --from=build /app/publish .

# Expõe a porta padrão
EXPOSE 80

# Ponto de entrada da aplicação
ENTRYPOINT ["dotnet", "backend.dll"]