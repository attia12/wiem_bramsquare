# ─── Build Stage ───────────────────────────────────────────────────────────────
ARG NODE_VERSION=20.11.1-alpine
FROM node:${NODE_VERSION} AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG CONFIG=production
RUN npm run build -- --configuration=${CONFIG}

# ─── Runtime Stage ─────────────────────────────────────────────────────────────
FROM nginx:1.25-alpine

# Ensure NGINX has the correct permissions to write to temp files and cache directories
RUN mkdir -p /var/cache/nginx/client_temp && \
    mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx

WORKDIR /usr/share/nginx/html

# Copy the built app from the builder stage
COPY --from=builder /app/dist/fuse/browser /usr/share/nginx/html

# Copy the custom NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for NGINX
EXPOSE 80

# Set the NGINX user to a non-root user with appropriate permissions
USER nginx

# Start NGINX
ENTRYPOINT ["nginx", "-g", "daemon off;"]
