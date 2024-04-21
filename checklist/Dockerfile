# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and potentially package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Run npm start when the container launches
CMD ["npm", "start"]
