# Common build stage
FROM node:lts-alpine as common-build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 5000
ENV PORT 5000

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

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=common-build-stage /app/node_modules ./node_modules
COPY . .

RUN chown nodejs:nodejs /app

USER nodejs

CMD npm run migrate && npm start
