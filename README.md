# Image resize microservice server

An image delivery microservice. The height and weight of the image are sent as GET parameters in the URL and resized image is cached on the server in `public/cache` folder. The original images are located in `public`.
Every image request is logged into a mysql database.

## Set-up

Build/rebuild and start the docker containers for debuging 
```sh
# sh cmd/rebuild.sh
```

For production:
```sh
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Tests:
```sh
# npm run test
```

## How to use

Request image by using this url: `/img/[image-name]?size=[height]x[width]`

Example: http://localhost:3000/img/alejandro-escamilla-9-unsplash.jpg?size=300x200


Statisctics page:

http://localhost:3000/stats

## TO DO

- Implement `dotenv`
- Extend tests
- Better DataBase service
- Code documentation 
- Better variable naming

## Considerations

> There are only two hard things in Computer Science: cache invalidation and naming things.
>-- Phil Karlton


## Other

based on https://github.com/microsoft/vscode-recipes/tree/master/Docker-TypeScript