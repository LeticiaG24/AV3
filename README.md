# AV2
## Manual de instalação
```
cd backend
npm install
npx prisma migrate dev --name init
npx prisma generate
npx tsx src/app.ts
```
Abra um novo terminal
```
cd frontend
npm install
npm run dev
```
## Links
- [Relatório de Desenvolvimento PDF](docs/relatorio_aerocode.pdf)
- [Query MySQL](docs/querySQL.md)

## Rotas
Login:
http://localhost:5173/

Usuários:
- Administrador - http://localhost:5173/admin
- Engenheiro - http://localhost:5173/engenheiro
- Operador - http://localhost:5173/operador

Detalhes de uma aeronave:
http://localhost:5173/aeronave