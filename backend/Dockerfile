FROM node:20-slim

WORKDIR /app/backend

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY backend/package*.json ./
RUN npm install

COPY backend ./

RUN npx prisma generate

EXPOSE 4000

CMD ["sh", "-c", "until npx prisma db push; do echo 'Waiting for DB...'; sleep 5; done; node server.js"]
