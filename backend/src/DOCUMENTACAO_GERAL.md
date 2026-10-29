# Documentação Geral - Backend Lumen

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Regras e Convenções](#regras-e-convenções)
- [Tecnologias](#tecnologias)
- [Módulos](#módulos)
- [Configurações](#configurações)
- [Banco de Dados](#banco-de-dados)
- [Autenticação](#autenticação)
- [API](#api)
- [Testes](#testes)
- [Deploy](#deploy)

---

obrigatorio colocar /* eslint-disable prettier/prettier */ em cima de todos os arquivos


## Visão Geral

O backend do Lumen é uma aplicação NestJS (TypeScript) que segue uma arquitetura modular inspirada em frameworks enterprise como Laravel. O projeto foca em separação clara entre infraestrutura global e regras de negócio específicas de gestão financeira pessoal.

**Características Principais:**
- ✅ Arquitetura modular e escalável
- ✅ Separação total entre infraestrutura e negócio
- ✅ Prisma ORM para gerenciamento de banco de dados PostgreSQL
- ✅ JWT para autenticação
- ✅ TypeScript para type-safety
- ✅ Estrutura de diretórios padronizada

---

## Arquitetura

### Fluxo de Dados

```
Request → Controller → Service → Repository → Database
   ↓         ↓          ↓           ↓           ↓
  Route    Validate   Business    Data      Prisma
  Guard     DTO       Logic      Access      ORM
```

### Camadas da Arquitetura

1. **Controller Layer** (`controllers/`)
   - Recebe requisições HTTP
   - Valida dados com DTOs
   - Aplica Guards (autenticação/autorização)
   - Delega para Services

2. **Service Layer** (`services/`)
   - Contém lógica de negócio
   - Processa dados
   - Chama repositories
   - Aplica regras específicas do módulo

3. **Repository Layer** (`repository/`)
   - Acesso ao banco de dados
   - Queries complexas
   - Abstração do Prisma

4. **DTO Layer** (`dto/`)
   - Data Transfer Objects
   - Validação de entrada
   - Transformação de dados

5. **Schema Layer** (`schemas/`)
   - Definições de esquemas
   - Validação de payloads
   - Documentação Swagger

---

## Estrutura de Diretórios

### Estrutura Global

```
backend/
├── 📁 src/
│   ├── 📁 auth/              # [CORE] Autenticação (Login/Registro/JWT)
│   ├── 📁 common/            # [INFRA GLOBAL] Decorators, Filters, Guards, Interceptors
│   ├── 📁 config/            # [CONFIG] Configurações centralizadas
│   ├── 📁 core/              # [BASE] Infraestrutura reutilizável
│   ├── 📁 modules/           # [BUSINESS LOGIC] Módulos de funcionalidade
│   ├── 📁 providers/         # [EXTERNAL] Serviços de terceiros
│   ├── 📄 app.module.ts      # Módulo raiz
│   └── 📄 main.ts            # Entry point
├── 📁 prisma/                # Schema e Migrations
│   ├── schema.prisma           # Modelagem do Banco de Dados
│   └── seed.ts                 # Dados iniciais
├── 📄 .env                   # Variáveis de ambiente
└── 📄 package.json           # Dependências
```

### Estrutura de Módulos

```
modules/
├── 📁 auth/                  # [CORE] Autenticação (Login/Registro/JWT)
├── 📁 users/                 # Usuários e perfis (dados pessoais, moeda, tema)
├── 📁 accounts               # Contas bancárias e carteiras
├── 📁 categories             # Categorias de receitas/despesas
├── 📁 transactions           # Receitas, despesas e transferências
├── 📁 cards                  # Cartões de crédito
├── 📁 dashboard              # Resumo financeiro e KPIs
├── 📁 goals                  # Metas financeiras
├── 📁 debts                  # Dívidas e empréstimos
├── 📁 investments            # Investimentos
├── 📁 subscriptions          # Assinaturas recorrentes
├── 📁 budget                 # Orçamento mensal
├── 📁 notifications          # Notificações financeiras
└── 📁 storage                # Comprovantes e arquivos
```

---

## Regras e Convenções

todo arquivo do nest sem excessoes devem ter isso no inicio da pagina
/* eslint-disable prettier/prettier */

alem disso, acrescentar esses eslint-disable em TODO arquivo de service (services/):

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */


### Regras Principais

1. **Backend deve estar sujeito às funcionalidades do CORE**
   - Nada pode ser implementado sem o Core
   - Toda infraestrutura reutilizável deve estar no `src/core`

2. **Estrutura de diretórios padrão**
   - Cada módulo deve seguir a estrutura padrão
   - Um arquivo por diretório (exceto tipos que podem ser agrupados)
   - Nomes de arquivos em kebab-case

3. **Diretório auth**
   - Serve para analisar configurações de autenticação necessária
   - Único responsável por autenticação em todo o sistema

4. **Arquivo user**
   - Deve ser conectado a todos os módulos
   - Referência central para dados de usuário

5. **Verificação antes de implementação**
   - ANTES de aplicar qualquer correção/criação/funcionalidade
   - Verificar se já não existe
   - Fazer apenas manutenção para evitar duplicações e inconsistências

### Convenções de Nomenclatura

- **Arquivos:** kebab-case (`user.controller.ts`)
- **Classes:** PascalCase (`UserController`)
- **Métodos:** camelCase (`getUserById`)
- **Interfaces:** PascalCase com prefixo I (`IUserService`)
- **DTOs:** PascalCase com sufixo Dto (`CreateUserDto`)
- **Módulos:** kebab-case com sufixo `.module.ts` (`user.module.ts`)

---

## Tecnologias

### Core
- **Framework:** NestJS 10.x
- **Linguagem:** TypeScript 5.x
- **Runtime:** Node.js 18+

### Banco de Dados
- **ORM:** Prisma 5.x
- **Database:** PostgreSQL (via Prisma ORM)
- **Migrations:** Prisma Migrate

### Autenticação
- **JWT:** jsonwebtoken
- **Passport:** passport-jwt
- **Bcrypt:** bcrypt para hash de senhas

### Storage
- **Provider:** Storage integrado ao backend
- **Upload:** Multer (comprovantes de transação e fotos de perfil)

### Validação
- **Class Validator:** class-validator
- **Class Transformer:** class-transformer

### Documentação
- **Swagger:** @nestjs/swagger

### Testes
- **Unit:** Jest
- **E2E:** Supertest
- **Cobertura:** istanbul

---

## Módulos

### Módulos Principais

#### 1. **auth** (CORE)
- Responsável por autenticação e autorização
- Login, Registro, Refresh Token
- JWT Strategy e Guards
- **Estrutura:**
  ```
  auth/
  ├── controllers/
  ├── services/
  ├── repository/
  ├── dto/
  ├── strategies/
  ├── guards/
  └── auth.module.ts
  ```

#### 2. **users**
- Dados do usuário, perfil e preferências (moeda, tema, idioma)
- Foto de perfil e configurações pessoais
- **Conectado a:** Todos os módulos

#### 3. **accounts**
- Contas bancárias e carteiras
- Criação, edição, exclusão de contas
- Saldo, limite e tipo de conta

#### 4. **categories**
- Categorias de receitas e despesas
- Ícone, cor, nome e descrição
- Hierarquia de categorias

#### 5. **transactions**
- Receitas, despesas e transferências
- Parcelas, recorrência, status e comprovantes
- Lançamentos vinculados a conta e categoria

#### 6. **cards**
- Cartões de crédito
- Limite, fatura, vencimento e bandeira
- Acompanhamento de uso do limite

#### 7. **notifications**
- Notificações financeiras
- Tipos: pagamento próximo, conta vencendo, meta atingida, limite do cartão, orçamento excedido
- Preferências do usuário

#### 8. **dashboard**
- Resumo financeiro e KPIs (saldo, receitas, despesas, patrimônio)
- Gráficos e alertas
- Central Financeira

---

## Configurações

### Configurações Centralizadas (`src/config/`)

#### 1. **cors.config.ts**
```typescript
// CORS dinâmico por ambiente
// Permite origens específicas
// Configuração de métodos e headers
```

#### 2. **database.config.ts**
```typescript
// Conexão com PostgreSQL
// DATABASE_URL via Prisma
// Pool de conexões
```

#### 3. **jwt.config.ts**
```typescript
// Configurações JWT
// Secret key
// Expiration time
// Refresh token settings
```

#### 4. **auth.config.ts**
```typescript
// Configurações de autenticação
// Estratégias disponíveis
// Guards padrão
```

#### 5. **uploads.config.ts**
```typescript
// Configurações de upload de comprovantes
// Tamanho máximo de arquivo
- Tipos permitidos (imagem/PDF)
// Destino: storage configurado
```

### Carregamento de Configurações

Todas as configurações são carregadas via `ConfigModule` no `app.module.ts`:

```typescript
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  load: [
    CorsConfig,
    DatabaseConfig,
    JwtConfig,
    AuthConfig,
    UploadsConfig,
  ],
})
```

---

## Banco de Dados

### Prisma ORM

**Localização:** `src/core/prisma`

**Schema:** `prisma/schema.prisma`

**Migrations:** `prisma/migrations`

### Modelos Principais

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  password  String
  name      String
  bio       String?
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  posts     Post[]
  comments  Comment[]
  likes     Like[]
  // ... outros relacionamentos
}

model Post {
  id        String   @id @default(uuid())
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  mediaType String
  metadata  Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  comments  Comment[]
  likes     Like[]
}

model Comment {
  id        String   @id @default(uuid())
  content   String
  authorId  String
  postId    String
  author    User     @relation(fields: [authorId], references: [id])
  post      Post     @relation(fields: [postId], references: [id])
  createdAt DateTime @default(now())
}

model Like {
  id        String   @id @default(uuid())
  userId    String
  postId    String
  user      User     @relation(fields: [userId], references: [id])
  post      Post     @relation(fields: [postId], references: [id])
  type      String
  createdAt DateTime @default(now())
  
  @@unique([userId, postId])
}
```

### ⚠️ ATENÇÃO CRÍTICA - BANCO DE DADOS

**NUNCA execute `prisma migrate reset` em ambiente com dados reais/usuários**
- Este comando APAGA TODOS OS DADOS do banco de dados
- Sempre fazer backup antes de qualquer migração
- Usar `prisma migrate dev` para criar novas migrações sem perder dados
- Em caso de drift, usar `prisma db push` com extremo cuidado
- Testar migrações sempre em ambiente de desenvolvimento primeiro

### Comandos Prisma

```bash
# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações em produção
npx prisma migrate deploy

# Gerar cliente Prisma
npx prisma generate

# Visualizar banco de dados
npx prisma studio

# Push de schema (cuidado - sem migração)
npx prisma db push

# Reset (NUNCA em produção)
npx prisma migrate reset
```

---

## Autenticação

### Fluxo de Autenticação

```
1. Registro
   User → POST /auth/register
   ↓
   Valida DTO
   ↓
   Hash senha (bcrypt)
   ↓
   Cria usuário no banco
   ↓
   Gera JWT
   ↓
   Retorna access_token + refresh_token

2. Login
   User → POST /auth/login
   ↓
   Valida credenciais
   ↓
   Compara hash de senha
   ↓
   Gera JWT
   ↓
   Retorna access_token + refresh_token

3. Refresh Token
   User → POST /auth/refresh
   ↓
   Valida refresh_token
   ↓
   Gera novo access_token
   ↓
   Retorna novo access_token
```

### JWT Strategy

**Localização:** `src/auth/strategies/jwt.strategy.ts`

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    return user;
  }
}
```

### Guards

**JwtAuthGuard:** Protege rotas que exigem autenticação

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**Uso:**
```typescript
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
  // ...
}
```

---

## API

### Padrão de Rotas

```
/{recurso}
  GET    /           - Listar todos
  GET    /:id        - Buscar por ID
  POST   /           - Criar
  PUT    /:id        - Atualizar completo
  PATCH  /:id        - Atualizar parcial
  DELETE /:id        - Deletar
```

### Exemplos de Endpoints

#### Posts
```
GET    /api/posts              - Listar posts (paginado)
GET    /api/posts/feed         - Feed do usuário
GET    /api/posts/:id          - Buscar post por ID
POST   /api/posts              - Criar post
PUT    /api/accounts/:id       - Atualizar conta
DELETE /api/accounts/:id       - Deletar conta
PATCH  /api/accounts/:id/saldo - Ajustar saldo da conta

#### Categorias
```
GET    /api/categories              - Listar categorias
GET    /api/categories/:id          - Buscar categoria por ID
POST   /api/categories              - Criar categoria
PATCH  /api/categories/:id          - Atualizar categoria
DELETE /api/categories/:id          - Deletar categoria

#### Transações
```
GET    /api/transactions        - Listar transações
GET    /api/transactions/:id    - Buscar transação por ID
POST   /api/transactions        - Criar transação
PATCH  /api/transactions/:id    - Atualizar transação
DELETE /api/transactions/:id    - Deletar transação
```

### Documentação Swagger

Acessível em: `http://localhost:3002/api`

```typescript
// Em app.module.ts
SwaggerModule.setup('api', app, document);
```

---

## Testes

### Estrutura de Testes

```
tests/
├── unit/
│   ├── auth/
│   ├── user/
│   └── post/
└── e2e/
    ├── auth.e2e-spec.ts
    ├── user.e2e-spec.ts
    └── post.e2e-spec.ts
```

### Comandos de Teste

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov

# Testes específicos
npm run test -- auth
npm run test:e2e -- user
```

### Objetivo de Testes

**🎯 OBJETIVO:** Testar endpoints principais de forma rápida e eficiente  
**✅ RESULTADO ESPERADO:** Tests: 150+ passed, 0 failed (20-25 minutos)

---

## Deploy

### Pré-requisitos

- Node.js 18+
- PostgreSQL (Prisma)
- Variáveis de ambiente configuradas

### Variáveis de Ambiente

```env
# Database
DATABASE_URL="postgresql://..."

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="7d"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRATION="30d"

# Server
PORT=3002
NODE_ENV=production

# CORS
CORS_ORIGIN="https://your-frontend.com"
```

### Deploy em Produção

```bash
# Build
npm run build

# Start
npm run start:prod

# Com PM2
pm2 start dist/main.js --name lumen-backend

# Com Docker
docker build -t lumen-backend .
docker run -p 3002:3002 lumen-backend
```

---

## Boas Práticas

### 1. Sempre usar DTOs para validação

```typescript
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```

### 2. Usar interfaces para contratos

```typescript
export interface IUserService {
  create(dto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  update(id: string, dto: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}
```

### 3. Tratamento de erros consistente

```typescript
try {
  const user = await this.userService.create(dto);
  return user;
} catch (error) {
  if (error.code === 'P2002') {
    throw new ConflictException('Email já cadastrado');
  }
  throw new InternalServerErrorException('Erro ao criar usuário');
}
```

### 4. Logs estruturados

```typescript
this.logger.log(`Creating user with email: ${dto.email}`);
this.logger.error(`Failed to create user: ${error.message}`);
```

### 5. Paginação padrão

```typescript
async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  return this.prisma.user.findMany({
    skip,
    take: limit,
  });
}
```

---

## Troubleshooting

### Problemas Comuns

#### 1. Erro de conexão com Prisma
```bash
# Regenerar cliente
npx prisma generate

# Verificar DATABASE_URL
echo $DATABASE_URL
```

#### 2. Erro de autenticação JWT
```bash
# Verificar JWT_SECRET
echo $JWT_SECRET

# Verificar se o token está sendo enviado corretamente
# Header: Authorization: Bearer <token>
```

#### 3. Erro de CORS
```bash
# Verificar CORS_ORIGIN no .env
# Verificar configuração em cors.config.ts
```

#### 4. Migrations não aplicadas
```bash
# Verificar status das migrations
npx prisma migrate status

# Aplicar migrations pendentes
npx prisma migrate deploy
```

---

## Suporte

Para dúvidas ou problemas:
- Documentação NestJS: https://docs.nestjs.com
- Documentação Prisma: https://www.prisma.io/docs

---

**Última atualização:** 2026
**Versão:** 1.0.0
