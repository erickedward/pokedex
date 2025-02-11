<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el Repositorio
2. Ejecutar
```
yarn install
```
3. Tene Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.env.templeate__ y renombrar la copia __.env__

6. Llenar las variables de entorno en __.env__
7. Ejecutar la aplicación en dev:
```
yarn strat:dev
```
8. Reconstruir la base de deatos con la semilla
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest