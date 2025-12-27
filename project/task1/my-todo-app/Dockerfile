FROM node:18-alpine
WORKDIR /app

# 1. Install dependencies (Cached layer)
COPY package*.json ./
RUN npm install

# 2. Copy code and RUN THE BUILD (This fixes the error)
COPY . .
RUN npm run build

# 3. Production Environment
EXPOSE 3000
ENV NODE_ENV=production

# 4. Start the server
CMD ["npm", "start"]