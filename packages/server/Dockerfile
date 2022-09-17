FROM node:lts-alpine as build
WORKDIR /app
ADD package*.json ./
ADD tsconfig*.json ./
RUN npm install --only=production
ADD src src
RUN npm run build

FROM node:lts-alpine
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV APP_ENV production
USER node
WORKDIR /srv/fboat-backend
COPY --chown=node:node --from=build /app/node_modules node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/package*.json ./
CMD ["dumb-init", "node", "dist/application"]
