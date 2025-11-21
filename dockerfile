FROM node:22.13.1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

CMD ["npm", "run", "start"]
