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

RUN apk add --no-cache python3 make g++

# Copy all package files first (not bind mount for the actual install)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter=backend

################################################################################
FROM deps as build

# Copy the rest of the source files
COPY apps/backend ./apps/backend

# Set working directory to backend for the build
WORKDIR /usr/src/app/apps/backend

# Run the build - node ace build needs to run from the backend directory
RUN node ace build

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
    adduser -S nodejs -u 1001

# Copy package files
COPY --chown=nodejs:nodejs package.json pnpm-workspace.yaml ./
COPY --chown=nodejs:nodejs apps/backend/package.json ./apps/backend/

# Copy node_modules from deps stage
COPY --from=deps --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=deps --chown=nodejs:nodejs /usr/src/app/apps/backend/node_modules ./apps/backend/node_modules

# Copy the built application
COPY --from=build --chown=nodejs:nodejs /usr/src/app/apps/backend/build ./apps/backend/build

# Create necessary directories
RUN mkdir -p /usr/src/app/apps/backend/logs /usr/src/app/apps/backend/tmp && \
    chown -R nodejs:nodejs /usr/src/app

USER nodejs

EXPOSE 3333

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3333/health || exit 1

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "apps/backend/build/bin/server.js"]
