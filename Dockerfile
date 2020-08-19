FROM node:12.18.0

WORKDIR /admin
ADD ./ /admin/

RUN chown -R node:node /admin/

USER node

RUN npm install

CMD node PeerServer.js
