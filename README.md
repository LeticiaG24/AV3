# 🚀 AV3

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![License](https://img.shields.io/badge/Status-Acadêmico-orange)

Sistema desenvolvido para a avaliação **AV3**, contendo uma aplicação **Frontend** e **Backend**.

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de possuir instalado:

* Node.js 20+
* npm
* Banco de dados MySQL configurado
* Git

---

## ⚙️ Configuração Inicial

### 1️⃣ Configurar variáveis de ambiente

No diretório do backend, edite o arquivo `.env` e altere a senha do banco de dados conforme sua configuração local.

```env
DATABSE_URL= ...SUA_SENHA...
DATABASE_PASSWORD=SUA_SENHA
```

---

## 🔧 Instalação e Execução

### Backend

Acesse a pasta do backend:

```bash
cd backend
```

#### Primeira execução

```bash
npm install
npm run start
```

#### Próximas execuções

```bash
npm run dev
```

---

### Frontend

Abra um novo terminal e execute:

```bash
cd frontend

npm install
npm run dev
```

---

## 🔑 Primeiro Acesso

Utilize as credenciais padrão abaixo:

```text
Usuário: admin
Senha: admin123
```

> No primeiro acesso, será exibida uma janela para atualização dos dados do usuário padrão. Após concluir essa etapa, recomenda-se cadastrar um segundo funcionário; assim, essa janela não será exibida novamente em futuros logins.

---

## 📚 Documentação

### Relatórios

* 📄 [Relatório de Desenvolvimento Frontend](docs/relatorio_aerocode.pdf)
* 📄 [Relatório de Qualidade Backend](docs/Relatorio_Qualidade_Aerocode.pdf)

---
## 📊 Script de Teste de Qualidade

O script responsável pela avaliação de desempenho do sistema está localizado em:

```text
backend/src/simular_carga.js
```

Esse script realiza testes de carga simulando **1, 5 e 10 usuários simultâneos**, coletando métricas de:

* **Latência** — tempo necessário para iniciar o processamento da requisição;
* **Tempo de processamento** — duração do processamento interno da operação;
* **Tempo de resposta** — tempo total entre o envio da requisição e o recebimento da resposta.

### Execução dos Testes

Primeiramente, inicie o servidor backend:

```bash
cd backend
npm run dev
```

Em seguida, abra um novo terminal e execute o script de teste:

```bash
cd backend
node src/simular_carga.js
```

Ao término da execução, serão exibidas no terminal as métricas coletadas para cada cenário de carga, permitindo a análise do comportamento e da escalabilidade do sistema.

---
## 📌 Observações

* Certifique-se de que o backend esteja em execução antes de iniciar o frontend.
* Verifique as configurações do arquivo `.env`.
* Mantenha as dependências atualizadas para evitar incompatibilidades.
