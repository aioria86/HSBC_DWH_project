FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar solo archivos de dependencias primero
COPY app/package*.json ./

# Instalar dependencias (incluye react-scripts)
RUN npm install

# Luego copiar el resto del código
COPY app/ ./

# Comando para levantar la app
CMD ["npm", "start"]
