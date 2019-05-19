FROM node:8-slim

WORKDIR /server

COPY . /server
RUN rm -rf node_modules/sharp/vendor
RUN npm install --arch=x64 --platform=linux --target=8.10.0 sharp

EXPOSE 3000
CMD [ "npm", "start" ]
