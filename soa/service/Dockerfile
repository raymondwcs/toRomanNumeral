FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY server.js /usr/src/app/
COPY toRomanNumeral.js /usr/src/app/
RUN npm install
EXPOSE 8099
ENTRYPOINT ["node", "server.js"]