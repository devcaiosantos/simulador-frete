# 🚛 Simulador de Frete

Este projeto é um sistema para **simulação de fretes**, composto por um **frontend em Next.js** e um **backend em NestJS**, utilizando **PostgreSQL** como banco de dados. A aplicação está **containerizada** utilizando Docker.

## 📸 Capturas de Tela

### 📍 Tela de Simulação de Frete
![Simulação de Frete](https://github.com/user-attachments/assets/e935352c-8b7b-44e9-ba97-f81dabdd3272)

### 📜 Tela de Histórico de Simulações
![Histórico de Simulações](https://github.com/user-attachments/assets/03af0cc3-c427-4cb0-baad-6d009222fd53)

---
## ✅ Relatório de Testes Automatizados
O projeto também possui alguns testes automatizados no core do backend:

![testes](https://github.com/user-attachments/assets/7d36bb0c-9beb-44fa-b65e-393fe949d2a4)

---
## 📜 Documentação da API (Swagger)

A API do backend está documentada utilizando Swagger. Para acessar a documentação interativa e testar as rotas, acesse a rota `URL_BACKEND/docs`:
![docs](https://github.com/user-attachments/assets/ab1b0ff1-880e-4ce5-a47c-ae3bd61c83c4)



---

## 🛠 Tecnologias Utilizadas

### 🎨 **Frontend**
- Next.js (React)
- Chakra-UI
- Styled-components
- Yup

### 🏗 **Backend**
- NestJS
- TypeORM
- Google Maps API
- Jest

### 🗄 **Banco de Dados**
- PostgreSQL

### 🐳 **Containerização**
- Docker & Docker Compose

---

## 🚀 Funcionalidades Principais

✅ Simulação de frete 

✅ Armazena histórico de simulações por e-mail  

---

## ⚙️ Requisitos

Antes de iniciar a instalação, certifique-se de ter os seguintes requisitos atendidos:

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.
- Arquivo `.env` com as variáveis de ambiente corretamente configuradas.

---

## 🛠 Instalação e Execução

### 1️⃣ Clonar o Repositório
```sh
git clone https://github.com/devcaiosantos/simulador-frete.git
cd simulador-frete
```

### 2️⃣ Configurar Variáveis de Ambiente
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

### 3️⃣ Subir os Containers com Docker Compose
```sh
docker-compose up --build
```

Isso iniciará os serviços:
- **🖥 Backend** acessível em `http://localhost:5000`
- **🌍 Frontend** acessível em `http://localhost:3000`
- **🗄 Banco de Dados PostgreSQL**

### 4️⃣ Parar e Remover os Containers
Para parar os containers, utilize:
```sh
docker-compose down
```

Se quiser remover os volumes persistentes:
```sh
docker-compose down -v
```

---

## 📜 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

### ✨ Desenvolvido por [Caio Luiz dos Santos](https://github.com/devcaiosantos)

