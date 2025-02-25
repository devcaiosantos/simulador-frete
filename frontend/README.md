# 🎨 Frontend - Simulador de Frete

Este documento fornece informações sobre a configuração e execução do frontend do Simulador de Frete.

## 🚀 Tecnologias Utilizadas

- **Framework:** Next.js
- **UI Components:** Chakra UI, Styled-components
- **Gerenciamento de Estado:** React Hooks
- **Validação de Formulários:** Yup
- **Requisições HTTP:** Axios

---

## 📜 Configuração e Execução Local

### 📌 Requisitos

Antes de iniciar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão recomendada: 18 ou superior)

### 1️⃣ Clonar o Repositório

```sh
git clone https://github.com/devcaiosantos/simulador-frete.git
cd simulador-frete/frontend
```

### 2️⃣ Instalar Dependências

```sh
yarn install
```

### 3️⃣ Configurar Variáveis de Ambiente

O projeto possui um arquivo `env.example` com as variáveis necessárias. Crie um arquivo `.env` na raiz do frontend e configure conforme o exemplo:

```sh
cp .env.example .env
```

Edite o arquivo `.env` para ajustar as configurações necessárias.

### 4️⃣ Iniciar o Servidor

#### Ambiente de Desenvolvimento
```sh
yarn run dev
```

#### Construção para Produção
```sh
yarn run build
yarn run start
```

O frontend estará rodando em `http://localhost:3000` por padrão.

---

## 🛠 Comandos Utilitários

- **Rodar Linter:** `yarn run lint`
- **Construir o Projeto:** `yarn run build`

---

## 📜 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

---

### ✨ Desenvolvido por [Caio Luiz Dos Santos](https://github.com/devcaiosantos)

