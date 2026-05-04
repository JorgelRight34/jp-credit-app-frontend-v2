FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# Accept the build argument
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]