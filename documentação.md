# Documentação da API RPG App

## a pasta logs tempo de resposta das rotas, nome da rota chamada, o método utilizado e quanto tempo demorou para a solicitação terminar.

## A pasta requisiçõesJson contém as requisições da aplicação em .json 

## Tecnologias Utilizadas

- **NestJS**: Framework utilizado para desenvolver a aplicação.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar usuários e personagens.
- **Mongoose**: Biblioteca para modelagem de dados do MongoDB.
- **Passport**: Middleware de autenticação utilizado com JWT (JSON Web Tokens).
- **bcrypt**: Biblioteca para hash de senhas.
- **axios**: Cliente HTTP para realizar chamadas à API externa.
- **Google Cloud**: Utilizado para a integração com a API de linguagem generativa.
- **Docker**: Utilizado para containerizar a aplicação e o banco de dados.

## Funcionalidades Principais

1. **Autenticação de Usuários**: Utiliza JWT para autenticação, com registro e login de usuários.
2. **Gerenciamento de Usuários**: Permite criar, ler, atualizar e deletar usuários.
3. **Gerenciamento de Personagens**: Permite criar, ler, atualizar e deletar personagens de RPG.
4. **Geração de Background e Aventuras**: Integra-se com uma API de linguagem generativa para criar histórias de fundo para personagens e aventuras para grupos de personagens.
5. **Logging**: Loga o tempo de resposta das rotas da API.

## Como o App Funciona

1. **Cadastro e Autenticação**: O usuário se registra utilizando um nome de usuário e senha. A senha é criptografada antes de ser armazenada no banco de dados. O login retorna um token JWT que deve ser utilizado para autenticação em rotas protegidas.
2. **Gerenciamento de Personagens**: O usuário pode criar novos personagens, atualizar detalhes dos personagens existentes, buscar personagens por ID e deletar personagens.
3. **Geração de Conteúdo**: O usuário pode solicitar a geração de um background para um personagem específico ou uma aventura para um grupo de personagens. A integração com a API de linguagem generativa do Google Cloud realiza essa tarefa.
4. **Proteção das Rotas**: As rotas principais da aplicação são protegidas utilizando um Auth Guard que verifica a presença e validade do token JWT.

## Rotas Disponíveis

### Autenticação

- **POST /auth/register**: Registra um novo usuário.
- **POST /auth/login**: Autentica um usuário e retorna um token JWT.

### Usuários

- **POST /users**: Cria um novo usuário.
- **GET /users**: Lista todos os usuários.
- **GET /users/:id**: Obtém detalhes de um usuário por ID.
- **PUT /users/:id**: Atualiza os dados de um usuário por ID.
- **DELETE /users/:id**: Remove um usuário por ID.

### Personagens

- **POST /characters**: Cria um novo personagem.
- **GET /characters**: Lista todos os personagens.
- **GET /characters/:id**: Obtém detalhes de um personagem por ID.
- **PUT /characters/:id**: Atualiza os dados de um personagem por ID.
- **DELETE /characters/:id**: Remove um personagem por ID.
- **POST /characters/generate-background/:id**: Gera um background para um personagem por ID.
- **POST /characters/random**: Cria um personagem aleatório.
- **POST /characters/generate-adventure**: Gera uma aventura para um grupo de personagens.

### env

- GEMINI_CLIENT_ID=your_gemini_client_id
- GEMINI_CLIENT_SECRET=your_gemini_client_secret
- GEMINI_REDIRECT_URI=http://localhost:3000/auth/google/callback
- GEMINI_ACCESS_TOKEN=your_gemini_access_token
- GEMINI_REFRESH_TOKEN=your_gemini_refresh_token
- GOOGLE_API_KEY=your_google_api_key

## Execução

Instale as dependências:
- npm install

Inicie o Docker Compose:
- docker-compose up

Acesse a aplicação:
- A aplicação estará disponível em http://localhost:3000.