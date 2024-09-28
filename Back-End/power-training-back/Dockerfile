FROM node:20.14.0-alpine

WORKDIR /usr/src/app

# Copia solo los archivos de dependencias primero
COPY package*.json ./

# Instala las dependencias
RUN apk add --no-cache make gcc g++ \
    && npm install \
    && npm cache clean --force

# Luego copia el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
