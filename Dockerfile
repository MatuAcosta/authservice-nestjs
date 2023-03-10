FROM node:alpine

WORKDIR /app
COPY ["package.json","package-lock.json","./"]
RUN npm install --silent
# CMD [ "npm", "start" ]
CMD ["node", "dist/main.js"]
EXPOSE 3000

# Install development packages if NODE_ENV is set to "development"
ARG ENV
ENV ENV $ENV
#RUN if [ "$ENV" == "development" ]; then npm install ; fi