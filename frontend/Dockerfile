# Etapa de build
FROM node:22.14.0 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install --frozen-lockfile

# Copia o restante dos arquivos do projeto
COPY . .

# Gera a build da aplicação
RUN npm run build

# Etapa de produção
FROM node:22.14.0

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]
