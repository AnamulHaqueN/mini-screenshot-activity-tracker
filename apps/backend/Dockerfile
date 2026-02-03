# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.13.1
ARG PNPM_VERSION=10.25.0

################################################################################
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

################################################################################
FROM base AS deps

# Copy all package files first
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter=backend

################################################################################
FROM deps AS build

# Copy the rest of the source files
COPY apps/backend ./apps/backend

# Set working directory to backend for the build
WORKDIR /usr/src/app/apps/backend

# Build the application (compiles TypeScript to JavaScript)
RUN pnpm run build

################################################################################
FROM base AS final

RUN apk add --no-cache \
    dumb-init \
    wget \
    curl \
    tzdata

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S adonisjs -u 1001

# Copy package files
COPY --chown=adonisjs:nodejs package.json pnpm-workspace.yaml ./
COPY --chown=adonisjs:nodejs apps/backend/package.json ./apps/backend/

# Copy production node_modules from deps stage
COPY --from=deps --chown=adonisjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=deps --chown=adonisjs:nodejs /usr/src/app/apps/backend/node_modules ./apps/backend/node_modules

# Copy the built application from build stage
COPY --from=build --chown=adonisjs:nodejs /usr/src/app/apps/backend/build ./apps/backend/build

# Create necessary directories and set permissions
RUN mkdir -p /usr/src/app/apps/backend/tmp && \
    chown -R adonisjs:nodejs /usr/src/app

USER adonisjs

EXPOSE 3333

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3333 || exit 1

ENTRYPOINT ["dumb-init", "--"]

# Change to backend directory and start the server
WORKDIR /usr/src/app/apps/backend
CMD ["node", "build/bin/server.js"]

