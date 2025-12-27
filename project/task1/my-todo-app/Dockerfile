FROM node:18-alpine

WORKDIR /app

# 1. Copy ONLY the package files first
COPY package*.json ./

# 2. Install dependencies (This layer will be CACHED unless package.json changes)
RUN npm install

# 3. Copy the rest of the app code AFTER installing
COPY . .

EXPOSE 3000
CMD ["npm", "start"]