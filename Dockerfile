FROM node:18

WORKDIR /app
COPY . .
RUN npm i

CMD ["npm", "run", "dev"]