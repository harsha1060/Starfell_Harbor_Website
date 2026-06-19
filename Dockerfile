# ---- Stage 1: Compile Astro App ----
FROM node:22-alpine AS builder
WORKDIR /app

# Install system dependencies if required and cache npm modules
COPY package*.json ./
RUN npm ci

# Pull over codebase and build optimization layer
COPY . .
RUN npm run build

# ---- Stage 2: Fast Static Production Server ----
FROM caddy:alpine

# Copy built production layout straight from the builder environment
COPY --from=builder /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
EXPOSE 443