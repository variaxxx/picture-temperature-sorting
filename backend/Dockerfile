# BASE
FROM node:lts-alpine AS base

WORKDIR /usr

# BUILDER
FROM base AS builder

WORKDIR /usr

COPY package*.json ./
RUN npm ci && \
    npm cache clean --force

COPY . .

RUN npm run build

# RUNNER
FROM base AS runner

WORKDIR /usr

COPY --from=builder /usr/dist ./dist
COPY --from=builder /usr/package*.json ./

RUN npm ci --omit-dev

EXPOSE 80

CMD ["npm", "run", "start:prod"]