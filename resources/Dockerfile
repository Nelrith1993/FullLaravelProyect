# Usa la imagen oficial de Node.js
FROM node:18 AS build

# Configura el directorio de trabajo
WORKDIR /var/www

# Copia el archivo package.json y package-lock.json (si existe)
COPY ./resources/package*.json ./resources/

# Instala las dependencias de npm
RUN npm install

# Copia el código fuente del frontend en el contenedor
COPY ./resources ./resources

# Compila los activos de Vue y JS
RUN npm run dev  # O `npm run build` si quieres hacer una construcción optimizada

# Expone el puerto del contenedor
EXPOSE 8080

CMD ["npm", "run", "dev"]

