﻿#FROM node as builder
#
#WORKDIR /app
#
#COPY src/package*.json ./
#RUN npm ci --only=production
#
#COPY src/ .
#RUN npm run build
#
#FROM nginx
#EXPOSE 80
#
#COPY --from=builder /app/dist/frontend /usr/share/nginx/html
#COPY default.conf /etc/nginx/conf.d/default.conf

FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf