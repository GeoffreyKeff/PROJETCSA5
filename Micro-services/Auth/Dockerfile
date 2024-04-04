FROM node:18
# Create app directory
WORKDIR /authApp

COPY package*.json ./
RUN npm install
COPY push-and-start.sh .
RUN chmod +x push-and-start.sh

COPY . .

EXPOSE 3000

CMD ["/bin/bash", "push-and-start.sh"]
