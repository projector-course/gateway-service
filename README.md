# gateway-service
gateway-service

1. ```GATEWAY``` перевіряє ```gateway-token``` якщо він є
2. ```GATEWAY``` перевіряє ```user``` якщо є ```token``` і немає ```gateway-token```
3. ```GATEWAY``` відправляє ```service-token``` якщо є ```user || gateway-token```
4. ```GATEWAY``` не перевіряє ```token``` якщо request ```/users/...```
5. Кожен ```SERVICE``` відправляє ```gateway-token```
6. ```SERVICE-USER``` додатково відправляє ```token```

Генерація ```gateway-token```:

```$ npm run token```