FROM node:20-alpine
WORKDIR /app

# 1. Copy ONLY package files
COPY package*.json ./

# 2. Install dependencies (This layer is cached if package.json didn't change!)
RUN npm install

# 3. Copy source code (This changes often, but doesn't trigger npm install)
COPY . .

EXPOSE 3000
CMD ["npm", "start"]