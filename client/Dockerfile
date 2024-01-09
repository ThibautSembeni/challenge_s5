# Use the Playwright Docker image as the base image
FROM mcr.microsoft.com/playwright:focal

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application files to the working directory
COPY . .

# Set the entry point for the container to run Playwright tests
CMD ["pnpm", "run", "test"]
