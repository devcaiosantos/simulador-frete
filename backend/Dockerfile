FROM node:22.14.0 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --silent --ignore-optional

COPY . .

RUN yarn build

EXPOSE 5000

FROM node:22.14.0

WORKDIR /app

# Copia os arquivos gerados na etapa de build para a imagem final
COPY --from=builder /app ./

EXPOSE 5000

CMD ["yarn", "start"]
