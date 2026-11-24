# syntax=docker/dockerfile:1
#
# xThrive: one Dockerfile, built from the repository root (the same layout as Relive's).
#
#   docker build --target frontend -t thrive-web \
#     --build-arg NEXT_PUBLIC_RELIVE_URL=https://relive.co.in .
#
# Or use docker-compose.yml. .env files are excluded by .dockerignore.

ARG NODE_IMAGE=node:22-bookworm-slim

# --------------------------------------------------------------- frontend ----

FROM ${NODE_IMAGE} AS frontend-build
WORKDIR /app/frontend
# The frontend has its own lockfile. Only frontend/ is copied, so npm treats it as a standalone project.
COPY frontend/package.json frontend/package-lock.json frontend/.npmrc ./
RUN npm ci --no-audit --no-fund
COPY frontend ./
# NEXT_PUBLIC_* values are compiled into the browser code, so they are build arguments, not run-time env.
ARG NEXT_PUBLIC_RELIVE_URL=https://relive.co.in
ENV NEXT_PUBLIC_RELIVE_URL=${NEXT_PUBLIC_RELIVE_URL}
RUN npm run build

# A static export (frontend/out): nginx serves the files, no Node at run time.
FROM nginx:1.27-alpine AS frontend
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/frontend/out /usr/share/nginx/html
EXPOSE 80
