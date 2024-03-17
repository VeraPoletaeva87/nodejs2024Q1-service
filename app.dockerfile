FROM node:20

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
COPY .env ./
COPY nest-cli.json ./

RUN npm ci
RUN npm run build

RUN rm -rf ./src
RUN rm -rf ./node_modules/
RUN rm package*.json
RUN rm tsconfig*.json
RUN rm nest-cli.json

# uncomment to debug the image content
# RUN ls -alh

EXPOSE 4000

CMD ["node", "dist/main"]