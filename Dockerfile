FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

COPY server ./server

EXPOSE 3001

ENV PORT=3001
ENV WS_HOST=0.0.0.0

CMD ["yarn", "server"]