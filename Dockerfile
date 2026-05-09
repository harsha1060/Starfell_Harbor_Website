# Use a lightweight Nginx image
FROM nginx:alpine

# Copy your website files to the Nginx html folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
