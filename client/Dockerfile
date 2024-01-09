FROM node:latest
LABEL authors="thibsbn"

WORKDIR /usr/src/app
COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

pnpm exec playwright install --with-deps

COPY . .

CMD ["pnpm", "run", "test"]

