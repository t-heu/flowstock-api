# Flowstock API

API construída com **Express**, **Prisma 7** e **Supabase PostgreSQL**.

Este README detalha como configurar, rodar localmente e fazer deploy em plataformas de nuvem (Render, Railway, Vercel), além de alertas importantes sobre rede e conexão com o banco.

---

## 1️⃣ O que aconteceu e por que mudou tudo

### Antes (sem IPv4 / sem pooler)

- Seu Supabase não tinha IPv4 público.  
- Plataformas como Render, Railway, Vercel só conseguem IPv4, não IPv6.  
- Quando o container tentava se conectar:

ENETUNREACH 2600:1f16:...

yaml
Copiar código

- Isso significa: rede inalcançável → IPv6 do Supabase não era acessível do container.  
- Local funciona porque seu computador suporta IPv6 nativamente.  
- Resultado: deploy não conectava ao banco, mesmo que tudo estivesse certo no código.

### Agora (usando Session Pooler / Pooler IPv4)

- O **Session Pooler** é um “proxy IPv4” fornecido pelo Supabase.  
- Ele fica entre seu container e o banco PostgreSQL.  
- Mesmo sem plano de IPv4 público, seu container faz conexão IPv4 para o pooler, que então fala com o PostgreSQL.  
- Resultado: deploy em nuvem funciona de primeira, Prisma conecta sem ENETUNREACH.

---

## 2️⃣ Requisitos

- Node.js >= 22  
- NPM ou Yarn  
- Conta no Supabase com **Session Pooler habilitado** (IPv4)  
- Docker/Cloud provider para deploy (Render, Railway, etc.)

---

## 3️⃣ Variáveis de Ambiente

No `.env` ou painel do provedor:

```env
DATABASE_URL=postgresql://<USER>:<PASSWORD>@<POOLER-HOST>.supabase.co:5432/postgres
```

⚠️ Importante: Para deploy em nuvem, use Session Pooler ou IPv4 público do Supabase.
Sem IPv4, o container não consegue se conectar ao banco → Prisma retorna ENETUNREACH.