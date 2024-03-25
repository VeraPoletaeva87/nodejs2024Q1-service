# FROM node:20

# WORKDIR /

# COPY package*.json ./
# COPY tsconfig*.json ./
# COPY ./src ./src
# COPY .env ./
# COPY nest-cli.json ./

# RUN npm ci
# RUN npm run build

# RUN rm -rf ./src
# RUN rm -rf ./node_modules/
# RUN rm package*.json
# RUN rm tsconfig*.json
# RUN rm nest-cli.json
FROM node:20

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]