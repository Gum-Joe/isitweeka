FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "yarn.lock", ".yarnrc.yml", "./"]
COPY ./.yarn ./.yarn
COPY "./packages" "./packages"
COPY "./server" "./server"
RUN yarn set version ./.yarn/releases/yarn-3.1.1.cjs
RUN yarn --immutable
RUN yarn workspace isitweeka-server run tsc
EXPOSE 4000
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "workspace", "isitweeka-server", "start"]
