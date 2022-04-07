## Description

Project created with the NestJS (exactly, Nest not Next) framework to allow its execution without having to install a lot of tooling. 

## Prerequisites
You will need:
* [Docker](https://docs.docker.com/get-docker/) and [docker compode](https://docs.docker.com/compose/install/)
* Node - I used node version 16 but, I think it might work with any lts version above 12 (no official source found).

## Installation
```bash
cd backend
$ npm install
```

## Running the app

```bash
$ docker-compose up # might need sudo depending on how it was installed

# development
$ npm run start:dev
```

## Live
The server is listening on port http://localhost:8080