FROM node:alpine

WORKDIR /usr/src/app

#ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm i

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]