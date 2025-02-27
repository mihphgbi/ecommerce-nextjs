# Sử dụng Node.js chính thức làm base image
FROM node:18.19.1

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt tất cả các dependencies
RUN npm install

# Copy tất cả các file vào container
COPY . .

# Mở cổng 3000 (cổng mặc định của Next.js)
EXPOSE 3001

# Build ứng dụng Next.js
RUN npm run build

# Chạy ứng dụng Next.js khi container khởi động
CMD ["npm", "start"]
