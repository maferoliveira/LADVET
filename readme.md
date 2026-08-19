# 🐾 LADVET - API Rest para Clínica Veterinária e Adoção

API RESTful desenvolvida em **Node.js** e **Express** para gerenciamento de clínicas veterinárias, registro de animais, controle de vacinação e processos de adoção.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web para criação de rotas e rotinas.
* **Prisma ORM**: Manipulação e modelagem do banco de dados PostgreSQL/MySQL.
* **JSON Web Token (JWT)**: Autenticação e geração de tokens de acesso.
* **Crypto (Nativo)**: Criptografia e segurança de senhas com `pbkdf2`.

---

## 📁 Estrutura de Pastas

```text
api/
├── src/
│   ├── controllers/      # Regras de negócio da aplicação
│   ├── data/             # Instância do Prisma Client
│   ├── middlewares/      # Middlewares de Autenticação e Permissão
│   └── routes/           # Definição das rotas e endpoints
├── .env                  # Variáveis de ambiente
├── package.json          # Dependências do projeto
└── README.md             # Documentação do projeto
🔑 Autenticação e Controle de Acesso
A API utiliza autenticação via Bearer Token (JWT). Para acessar rotas protegidas, envie o token no header da requisição:

HTTP
Authorization: Bearer <SEU_TOKEN_JWT>
Perfis de Usuário
ADOTANTE: Pode visualizar animais e registrar/acompanhar solicitações de adoção.

CLINICA: Tem acesso completo ao gerenciamento de vacinas, cadastros e atualizações de registros.

🚀 Como Executar o Projeto
Clone o repositório:

Bash
git clone [https://github.com/seu-usuario/ladvet.git](https://github.com/seu-usuario/ladvet.git)
cd ladvet/api
Instale as dependências:

Bash
npm install
Configure as Variáveis de Ambiente (.env):
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

Snippet de código
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ladvet?schema=public"
SECRET_JWT="sua_chave_secreta_jwt"
Execute as Migrations do Prisma:

Bash
npx prisma migrate dev
Inicie o Servidor:

Bash
npm start
# ou para modo de desenvolvimento:
npm run dev

A API retorna códigos HTTP padronizados:

200 / 201: Operações realizadas com sucesso.

400: Dados obrigatórios ausentes ou formatos inválidos.

401: Token ausente ou inválido.

403: Perfil de usuário sem permissão para acessar a rota.

404: Registro não encontrado.

500: Erro interno do servidor.