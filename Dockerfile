# syntax=docker/dockerfile:1
#
# xThrive website: a Next.js app exported to static files (out/), served by nginx, so no Node at run time.
#
#   docker build -t thrive-web --build-arg NEXT_PUBLIC_RELIVE_URL=https://relive.co.in .
#
# Or use docker-compose.yml.

FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Where the "Log in" buttons go. Compiled into the pages, so a build argument.
ARG NEXT_PUBLIC_RELIVE_URL=https://relive.co.in
ENV NEXT_PUBLIC_RELIVE_URL=${NEXT_PUBLIC_RELIVE_URL}
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
