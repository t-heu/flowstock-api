# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.19.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app
ENV NODE_ENV="production"

# Build stage
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install dependencies
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build TS code (tsup) WITHOUT tentar importar Prisma Client
RUN npm run build

# Remove dev dependencies
RUN npm prune --omit=dev

# Final stage
FROM base

WORKDIR /app

# Copy built app
COPY --from=build /app /app

# Expose port
EXPOSE 3000

# Generate Prisma Client e start app no runtime
CMD [ "npm", "run", "start" ]
