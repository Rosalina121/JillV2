FROM node:18

# Create app dir
WORKDIR /usr/src/app

# Install deps
COPY package*.json ./
RUN npm install

# Bundle app sauce
COPY . .

# Start
CMD [ "npm", "start" ]
