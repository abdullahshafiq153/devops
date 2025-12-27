# 1. Use the official Node.js image (Lightweight version)
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first (better caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your application code
COPY . .

# 6. Expose the port your app runs on (usually 3000)
EXPOSE 3000

# 7. Start the application
# (Make sure your main file is named 'app.js' or 'index.js', or check package.json)
CMD ["npm", "start"]