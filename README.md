# Simulador de Frete

Este projeto é um sistema para simulação de fretes, composto por um frontend em Next.js e um backend em NestJS, utilizando PostgreSQL como banco de dados. A aplicação está containerizada utilizando Docker.

## Tecnologias Utilizadas

- **Frontend:** Next.js (React)
- **Backend:** NestJS
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker & Docker Compose

## Requisitos

Antes de iniciar a instalação, certifique-se de ter os seguintes requisitos atendidos:

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.
- Arquivo `.env` com as variáveis de ambiente corretamente configuradas.

## Instalação e Execução

### 1. Clonar o Repositório
```sh
git clone https://github.com/devcaiosantos/simulador-frete.git
cd imulador-frete
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e defina as variáveis conforme necessário. Exemplo:

```env
BACKEND_PORT=5000
FRONTEND_PORT=3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_MAPS_URL=your_google_maps_url
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
```

### 3. Subir os Containers com Docker Compose
```sh
docker-compose up --build
```

Isso iniciará os serviços:
- **Backend** acessível em `http://localhost:5000`
- **Frontend** acessível em `http://localhost:3000`
- **Banco de Dados PostgreSQL**

### 4. Parar e Remover os Containers
Para parar os containers, utilize:
```sh
docker-compose down
```

Se quiser remover os volumes persistentes:
```sh
docker-compose down -v
```
