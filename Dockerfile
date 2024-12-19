FROM oven/bun:latest
WORKDIR /usr/bun/app

COPY package.json .
COPY bun.lockb .
RUN bun install
COPY . .
RUN bun db:sync
CMD ["bun", "run", "start"]
