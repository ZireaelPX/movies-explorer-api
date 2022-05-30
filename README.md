# movies-explorer-api

> REST API with Express, Node and MongoDB for movie search service.

Публичный IP-адрес сервера: 62.84.127.203     
Домен сервера: <https://api.search-save-movie.nomoredomains.work>   

## Запуск проекта

`npm i` — обновление зависимостей;   
`npm run start` — запуск сервера;   
`npm run dev` — запуск сервера с hot-reload.   

#### Основные роуты

`POST /signup` — регистрирует пользователя c переданными name (опционально), email и password;    
`POST /signin` — авторизует пользователя с переданными email и password;    
`GET /signout` — осуществляет выход пользователя из системы.  

#### Роуты пользователей

`GET /users/me` — возвращает информацию о пользователе;  
`PATCH /users/me` — обновляет профиль с переданными name и email.  

#### Роуты фильмов

`GET /movies` — возвращает избранные фильмы пользователя;  
`POST /movies` — добавляет фильм в избранное: создаёт фильм с переданными параметрами в теле запроса, устанавливает поле owner для фильма;  
`DELETE /movies/:movieId` — удаляет фильм по id.    
