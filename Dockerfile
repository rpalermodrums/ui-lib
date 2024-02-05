#############################################
############ BUILDER IMAGE ##################
#############################################

FROM node:lts-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --include=optional

COPY . .
RUN npm run build

#############################################
######### DEV / TESTING IMAGE ###############
#############################################

FROM builder as dev
WORKDIR /app

CMD [ "npm", "run", "dev" ]

#############################################
############ Production IMAGE ###############
#############################################

FROM node:lts-bullseye-slim as prod
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev && npm i vite

COPY --from=builder /app/dist ./dist
CMD ["npm", "run", "preview", "--", "--port", "8080", "--mode", "production"]
