FROM node:19-alpine
WORKDIR /app
VOLUME /app
COPY ["package.json","package-lock.json","./"]
ARG ENV
ENV ENV development
RUN npm install --silent
COPY . . 
RUN npm run build
# CMD [ "npm", "start" ]
CMD ["node", "dist/apps/auth-nest/main.js"]
EXPOSE 8080
#CMD ["npm", "run", "start:dev"]
# Install development packages if NODE_ENV is set to "development"
