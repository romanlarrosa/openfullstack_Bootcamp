# Phonebook API

La API se encuentra alojada en Heroku

Puedes acceder a la aplicación desarrollada en la parte 2 para la gestión de números que funciona con el backend desarrollado en esta parte aquí:

[API Phonebook](https://api-phonebook-rll.herokuapp.com/)

## API

La api está alojada en el mismo servidor, y puede ser usada mediante la siguiente dirección:

https://api-phonebook-rll.herokuapp.com/api

Entonces, las peticiones se realizarán mediante tecnología REST con GET, POST, etc...
Por ejemplo, para recibir todas las personas guardadas haremos una petición rest como sigue:

```
GET https://api-phonebook-rll.herokuapp.com/api/persons
```

En esta parte, se ha extendido la funcionalidad para que todos los datos sean almacenados en una base de datos MongoDB, se han añaiddo scripts para la automatización de la construcción del proyecto React y el deploy al servidor de Heroku. Además se han añadido validaciones a las inserciones de datos. También se han refactorizado los

Se ha añadido tambien ESLint para tener un código consistente.
