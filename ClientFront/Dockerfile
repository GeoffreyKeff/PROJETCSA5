FROM node:18
# Create app directory
WORKDIR /clientFrontApp

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD npm run dev
