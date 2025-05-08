# Sistema de Controle de Investimentos

Sistema para controle e gerenciamento de investimentos pessoais.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Backend

- Node.js com Express
- TypeScript
- Prisma como ORM
- Supabase para autenticação
- Validação com Zod

### Frontend

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form

## Requisitos

- Node.js 18 ou superior
- npm ou yarn
- Conta no Supabase

## Configuração

1. Clone o repositório
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências do backend
```bash
cd backend
npm install
```

3. Instale as dependências do frontend
```bash
cd frontend
npm install
```

4. Configure as variáveis de ambiente:

Backend (.env):
```
PORT=3001
SUPABASE_URL=sua_url
SUPABASE_KEY=sua_chave
DATABASE_URL=sua_url_do_banco
```

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Executando o Projeto

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

## Scripts Disponíveis

### Backend

- `npm run dev`: Inicia o servidor em modo desenvolvimento
- `npm run build`: Compila o projeto
- `npm start`: Inicia o servidor em produção
- `npm test`: Executa os testes
- `npm run lint`: Executa o linter
- `npm run format`: Formata o código

### Frontend

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto
- `npm start`: Inicia o servidor em produção
- `npm run lint`: Executa o linter
- `npm run format`: Formata o código 