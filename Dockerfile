FROM node:23-alpine3.19
WORKDIR /app
COPY ./ ./
RUN npm install
EXPOSE 5005
ENTRYPOINT ["npm", "run", "dev"]