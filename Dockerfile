# Stage 1: Build the Vite application
FROM node:16-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Attempt to explicitly install the problematic module (this is an example and might not be directly applicable)
# RUN npm install @rollup/rollup

COPY . ./

# If the above doesn't solve the issue, uncomment the next line to forcibly clean install dependencies
# RUN rm -rf node_modules package-lock.json && npm install

RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine as server

COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 83

CMD ["nginx", "-g", "daemon off;"]