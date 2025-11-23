# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.19.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"
WORKDIR /app
ENV NODE_ENV=production

# Instala ferramentas de build (somente build stage precisa)
FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copia package.json e package-lock
COPY package*.json ./

# Instala dependências incluindo dev (para tsup)
RUN npm ci --include=dev

# Copia o código
COPY . .

# Build da aplicação
RUN npm run build

# Remove devDependencies para reduzir tamanho
RUN npm prune --omit=dev

# Final image
FROM base

WORKDIR /app

# Copia tudo do build
COPY --from=build /app /app

# Porta padrão
EXPOSE 3000

# Start com Prisma generate no runtime
CMD ["sh", "-c", "npx prisma generate && node dist/server.js"]
