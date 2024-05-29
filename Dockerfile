FROM node:20-alpine AS base

# Build the app
FROM base AS builder

WORKDIR /app

RUN npm i -g pnpm

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY tsconfig.json tsconfig.json

RUN pnpm i
RUN pnpm i @babel/runtime

COPY . .

RUN pnpm expo export -p web

# Serve the app
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/dist /app/dist

ENTRYPOINT ["npx", "serve", "dist", "--single"]