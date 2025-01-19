# Step 1: Use the official Node.js image from the Docker Hub
FROM dhifallah10fakhreddine/nextjs-app:latest

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Use a smaller image for production (optional)
FROM node:18-alpine

# Set the working directory in the final image
WORKDIR /app

# Copy the built Next.js app from the build stage
COPY --from=build /app ./

# Install production dependencies (optional)
RUN npm install --production

# Expose the default Next.js port (3000)
EXPOSE 3000

# Step 8: Start the Next.js app
CMD ["npm", "run","dev"]

RUN chmod +x /usr/local/bin/docker-entrypoint.sh
