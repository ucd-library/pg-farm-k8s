FROM node:17

# add some utils
RUN apt-get update && apt-get install -y curl

WORKDIR /root
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

RUN mkdir /service
WORKDIR /service

COPY package.json .
COPY package-lock.json .
RUN npm install --production

COPY cli cli
COPY lib lib