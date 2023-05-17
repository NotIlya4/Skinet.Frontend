FROM node as builder

WORKDIR /app

COPY src/package*.json ./
RUN npm ci --omit=dev

COPY src/ .
RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build

FROM nginx
EXPOSE 80

COPY --from=builder /app/dist/frontend /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
