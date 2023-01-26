# Common build stage
FROM node:lts-alpine as common-build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

# Standalone-test build stage
FROM node:lts-alpine as test-build-stage
WORKDIR /app

ENV NODE_ENV test

COPY --from=common-build-stage /app/node_modules ./node_modules
COPY . .

CMD npm run migrate && npm run seed && npm start

# Production build stage
FROM node:lts-alpine AS production-build-stage
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs -g nodejs

COPY --from=common-build-stage --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

USER nodejs

EXPOSE 5000
ENV PORT 5000

CMD npm run migrate && npm start
