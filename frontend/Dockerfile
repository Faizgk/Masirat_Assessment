# Node.js 18
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# below line may be required for react-scripts 5.0+ in Docker
# ENV WDS_SOCKET_PORT=0

# Copy the rest of the application source code
COPY . .

# Expose the port React runs on
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]