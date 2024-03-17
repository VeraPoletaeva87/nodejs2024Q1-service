FROM postgres:16

COPY package*.json ./

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start:prod"]