# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# and install dependencies. Use a separate step to leverage Docker cache.
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the application
CMD ["npm", "run", "start:prod"]
