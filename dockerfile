# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Your app binds to port 5000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 5000

# Define the command to run your app
CMD [ "node", "Server.js" ]