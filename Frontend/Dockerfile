# Build Stage
FROM node:20-alpine AS build
WORKDIR /app

# Copying package files and installing dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copying the rest of the application
COPY . .

# Building the app for production
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copying custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copying built assets from build stage to nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
