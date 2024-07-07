#React app image
FROM node:lts-alpine as build

ARG VITE_API_ENDPOINT
ENV VITE_API_ENDPOINT=${VITE_API_ENDPOINT}

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:latest as prod

COPY --from=build /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]