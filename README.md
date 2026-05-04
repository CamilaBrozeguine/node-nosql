# Node NoSQL - API de Gerenciamento de Usuários

##  Descrição do Projeto

Node NoSQL é uma API RESTful desenvolvida com **Node.js** e **Express** para gerenciamento de usuários. O projeto implementa operações CRUD (Create, Read, Update, Delete) com persistência de dados em um banco de dados **MongoDB**, seguindo padrões modernos de desenvolvimento backend.

##  Por que MongoDB?

Optei pelo **MongoDB** pela flexibilidade no esquema de dados do usuário. As principais razões foram:

### 1. **Flexibilidade do Esquema**
- MongoDB permite adicionar novos campos aos usuários sem necessidade de migrations complexas
- Cada documento pode ter estruturas levemente diferentes, ideal para dados em evolução
- Facilita expansões futuras do modelo de usuário

### 2. **Estrutura de Dados Natural**
- Os dados do usuário naturalmente se encaixam em documentos JSON, que o MongoDB armazena nativamente
- Não há necessidade de relacionamentos complexos neste contexto, tornando NoSQL a escolha ideal

### 3. **Escalabilidade Horizontal**
- MongoDB oferece replicação e sharding para crescimento em escala
- Ideal para aplicações que podem precisar expandir em volume de dados

### 4. **Desenvolvimento Ágil**
- Prototipagem rápida sem necessidade de definir esquemas rígidos antecipadamente
- Mongoose fornece validação e segurança do lado da aplicação quando necessário

### 5. **Performance**
- Consultas rápidas em grandes volumes de dados
- Indexação eficiente nos campos críticos (email, etc.)

## 🛠️ Stack de Tecnologia

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Node.js** | 22.16.0 | Runtime JavaScript |
| **Express** | ^5.2.1 | Framework web |
| **MongoDB** | - | Banco de dados NoSQL |
| **Mongoose** | ^9.6.1 | ODM (Object Document Mapper) |
| **Nodemon** | ^3.1.14 | Dev: Auto-reload do servidor |

##  Estrutura do Projeto

```
node-nosql/
├── config/
│   └── db.js              # Configuração de conexão com MongoDB
├── controllers/
│   └── usuarioController.js   # Lógica de negócio para usuários
├── models/
│   └── usuario.js         # Schema do usuário com Mongoose
├── routes/
│   └── usuarioRoutes.js   # Definição das rotas da API
├── postman/               # Collection Postman para testes
├── server.js              # Arquivo principal da aplicação
├── package.json           # Dependências do projeto
└── README.md              # Este arquivo
```

##  Instalação e Configuração

### Pré-requisitos
- **Node.js** (v18+)
- **MongoDB** rodando localmente ou uma string de conexão remota

### 1. Clonar/Acessar o Projeto
```bash
cd node-nosql
```

### 2. Instalar Dependências
```bash
npm install


## 📝 Notas de Desenvolvimento

- Validações de email e idade são feitas pelo Mongoose
- O campo `email` é único, prevenindo duplicatas
- Todos os campos são obrigatórios
- Use `nodemon` para desenvolvimento com auto-reload

## 🔮 Melhorias Futuras

- [ ] Autenticação e autorização (JWT)
- [ ] Paginação na listagem de usuários
- [ ] Busca e filtros avançados
- [ ] Testes unitários e de integração
- [ ] Documentação Swagger/OpenAPI
- [ ] Docker para containerização
- [ ] Variáveis de ambiente (.env)

## 📄 Licença

ISC

---

**Desenvolvido com ❤️ usando Node.js, Express e MongoDB**
