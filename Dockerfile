FROM nginx:alpine

# Only copy site files, not your config/docker files
COPY ./site /usr/share/nginx/html

# ✅ This was the missing line causing your problem
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80