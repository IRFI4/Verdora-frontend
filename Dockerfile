FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN ln -s /usr/share/nginx/html /usr/share/nginx/html/Front-end-Verdora
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]