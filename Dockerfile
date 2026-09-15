FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.* ./

EXPOSE 4000

CMD ["pnpm", "start", "--hostname", "0.0.0.0", "--port", "4000"]