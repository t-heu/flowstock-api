# syntax = docker/dockerfile:1
ARG NODE_VERSION=20.19.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"
WORKDIR /app
ENV NODE_ENV="production"

# Build stage
FROM base AS build

# Instala ferramentas necessárias para node-gyp e builds nativos
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências
RUN npm ci --include=dev

# Copia código e schema do Prisma
COPY . .
COPY prisma ./prisma

# Gera o Prisma Client
RUN npx prisma generate

# Compila TypeScript
RUN npm run build

# Remove devDependencies
RUN npm prune --omit=dev

# Final stage
FROM base
WORKDIR /app

# Copia build + node_modules + prisma
COPY --from=build /app /app

EXPOSE 3000
CMD ["npm", "run", "start"]
