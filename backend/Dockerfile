# Etapa 1: Build
FROM node:22.14.0 AS builder

WORKDIR /app

# Copia os arquivos de dependências para instalar as mesmas
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install --silent --ignore-optional

# Copia o restante do código fonte
COPY . .

# Realiza o build da aplicação
RUN yarn build

# Expondo a porta (opcional nesta etapa)
EXPOSE 5000

# Etapa 2: Imagem de Produção
FROM node:22.14.0

WORKDIR /app

# Copia os arquivos gerados na etapa de build para a imagem final
COPY --from=builder /app ./

# Expondo a porta que a aplicação irá utilizar
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["yarn", "start"]
