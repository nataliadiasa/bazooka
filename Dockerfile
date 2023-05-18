FROM cypress/browsers

WORKDIR /home/app
COPY . .

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash -
RUN apt-get -y install nodejs
RUN npm install

CMD [ "npm", "run", "cypress:run" ]