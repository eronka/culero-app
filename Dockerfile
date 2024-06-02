FROM node:20-alpine AS base

# Build the app
FROM base AS builder

WORKDIR /app

RUN npm i -g pnpm

COPY . .

RUN pnpm i
RUN pnpm i @babel/runtime
RUN npx tailwindcss -i ./global.css -o ./node_modules/.cache/nativewind/global.css.web.css

ARG API_BASE_URL
RUN echo "EXPO_PUBLIC_API_BASE_URL=$API_BASE_URL" > .env

RUN pnpm expo export -p web

# Serve the app
FROM base AS runner

WORKDIR /app
COPY --from=builder /app/dist /app/dist

RUN npm i -g serve

ENTRYPOINT ["npx", "serve", "dist", "--single"]