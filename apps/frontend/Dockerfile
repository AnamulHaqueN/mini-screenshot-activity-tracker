# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.13.1
ARG PNPM_VERSION=10.25.0

################################################################################
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

################################################################################
FROM base as deps

# Copy all package files first
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter=frontend

################################################################################
FROM deps as build

# Copy the rest of the source files
COPY apps/frontend ./apps/frontend

# Set working directory to frontend for the build
WORKDIR /usr/src/app/apps/frontend

# Build arguments for environment variables needed at build time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Run the build
RUN pnpm run build

################################################################################
FROM base as final

RUN apk add --no-cache \
    dumb-init \
    wget \
    curl \
    tzdata

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy package files
COPY --chown=nextjs:nodejs package.json pnpm-workspace.yaml ./
COPY --chown=nextjs:nodejs apps/frontend/package.json ./apps/frontend/

# Copy node_modules from deps stage
COPY --from=deps --chown=nextjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=deps --chown=nextjs:nodejs /usr/src/app/apps/frontend/node_modules ./apps/frontend/node_modules

# Copy the built application
COPY --from=build --chown=nextjs:nodejs /usr/src/app/apps/frontend/.next ./apps/frontend/.next
COPY --from=build --chown=nextjs:nodejs /usr/src/app/apps/frontend/public ./apps/frontend/public
COPY --from=build --chown=nextjs:nodejs /usr/src/app/apps/frontend/next.config.ts ./apps/frontend/next.config.ts

# Create necessary directories
RUN mkdir -p /usr/src/app/apps/frontend/.next/cache && \
    chown -R nextjs:nodejs /usr/src/app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "apps/frontend/node_modules/.bin/next", "start", "-p", "3000", "--hostname", "0.0.0.0"]

