# Step 1: Build the app
FROM node:latest as builder

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

## Step 2: Set up the production environment and run the nginx server
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]