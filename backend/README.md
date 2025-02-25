# 📦 Backend - Simulador de Frete

Este documento fornece informações sobre a configuração e execução do backend do Simulador de Frete.

## 🚀 Tecnologias Utilizadas

- **Framework:** NestJS
- **Banco de Dados:** PostgreSQL
- **ORM:** TypeORM
- **Validação:** class-validator, class-transformer
- **HTTP Requests:** Axios
- **Documentação da API:** Swagger

---

## 📜 Configuração e Execução Local

### 📌 Requisitos
Antes de iniciar, certifique-se de ter instalado:
Node.js (versão recomendada: 18 ou superior

### 1️⃣ Clonar o Repositório

```sh
git clone https://github.com/devcaiosantos/simulador-frete.git
cd simulador-frete/backend
```

### 2️⃣ Instalar Dependências

```sh
yarn install
```

### 3️⃣ Configurar Variáveis de Ambiente

O projeto possui um arquivo `env.example` com as variáveis necessárias. Crie um arquivo `.env` na raiz do backend e configure conforme o exemplo:

```sh
cp env.example .env
```

Edite o arquivo `.env` para ajustar as credenciais do banco de dados e outras configurações necessárias.

### 4️⃣ Iniciar o Servidor

#### Ambiente de Desenvolvimento
```sh
yarn start:dev
```

#### Ambiente de Produção
```sh
yarn build
yarn start:prod
```

O backend estará rodando em `http://localhost:5000` por padrão.

---

## 📄 Documentação da API (Swagger)

A documentação interativa está disponível no seguinte endpoint:

🔗 [Swagger UI - Documentação da API](http://localhost:5000/docs)

> Certifique-se de que o backend está rodando antes de acessar.

---

## 🛠 Comandos Utilitários

- **Rodar Testes Unitários:** `yarn test`
- **Executar Linter:** `yarn lint`

---

## 📜 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

---

### ✨ Desenvolvido por [Caio Luiz dos Santos](https://github.com/devcaiosantos)

