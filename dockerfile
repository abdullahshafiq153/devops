# Use Node image
FROM node:18-alpine

# Set directory
WORKDIR /app

# Create a simple server file DIRECTLY inside the image
# (This trick bypasses the missing file error)
RUN echo 'const http = require("http"); \
const server = http.createServer((req, res) => { \
  res.statusCode = 200; \
  res.setHeader("Content-Type", "text/plain"); \
  res.end("Viva Success! Version 0.6 is Live!\\n"); \
}); \
server.listen(3000, "0.0.0.0", () => { \
  console.log("Server running on port 3000"); \
});' > server.js

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]