FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY package*.json ./
RUN npm install

# Copia o resto dos arquivos
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Comando para rodar em modo desenvolvimento com ts-node
CMD ["npx", "ts-node", "src/server.ts"]
