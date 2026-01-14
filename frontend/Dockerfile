FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências DENTRO do linux do container
RUN npm install

# Copia o resto dos arquivos
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
