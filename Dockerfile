# 1. Етап збірки (Build Stage)
FROM node:20-alpine AS build

WORKDIR /app

# Копіюємо package.json та встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо весь код та збираємо проєкт
COPY . .
RUN npm run build

# 2. Етап запуску (Production Stage)
FROM nginx:alpine

# Копіюємо зібраний стачу з Vite у папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]