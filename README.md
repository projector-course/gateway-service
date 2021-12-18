# gateway-service
gateway-service

1. ```GATEWAY``` перевіряє ```user``` якщо є ```token``` і немає ```service-key```
2. ```GATEWAY``` відправляє ```service-key``` якщо є ```user```
3. ```GATEWAY``` не перевіряє ```token``` якщо request ```/users/...```
4. Кожен ```SERVICE``` відправляє ```service-key```
5. ```SERVICE-USER``` додатково відправляє ```token```
