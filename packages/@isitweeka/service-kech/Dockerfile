FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "yarn.lock", ".yarnrc.yml", "tsconfig.json", "./"]
COPY ./.yarn ./.yarn
COPY ./config ./config
COPY ./.yarn ./.yarn
COPY "./packages" "./packages"
COPY "./server" "./server"
RUN chown -R node /usr/src/app
USER node
RUN yarn set version ./.yarn/releases/yarn-3.2.0.cjs
RUN yarn
RUN yarn run build
EXPOSE 4000

CMD ["yarn", "workspace", "@isitweeka/service-kech", "start"]
