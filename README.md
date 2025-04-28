This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## ORM Prisma + bdd + nextAuth

pour installer prisma + nextAuth
```bash
npm install next-auth @prisma/client @next-auth/prisma-adapter
```
```bash
npm install prisma --save-dev
```

creer le shema.prisma
```bash
npx prisma init --output ../src/app/generated/prisma
```
une fois qu'on a configurer le provider, le .env et ajouter nos models:
```bash
npx prisma generate
npx prisma migrate dev --name init
```
en cas de modif: 
```bash
npx prisma db push
```

pour seed la base:
```bash
npx tsx prisma/seed.ts

```
si ts n'est pas installé :
```bash
npm install ts-node -D
```

pour reset la base 
```bash
npx prisma migrate reset
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
