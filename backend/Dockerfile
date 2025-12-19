# Use Node 18
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy your source code (index.js, models, etc.)
COPY . .

# Expose the port Express is listening on
EXPOSE 3000

# Start the app using the script we just added to package.json
CMD ["npm", "run", "dev"]