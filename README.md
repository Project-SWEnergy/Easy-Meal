# Easy-Meal

Easy-Meal è una web app per seplificare l'interazione tra utenti e ristoranti. 
Infatti Easy-Meal offre due interfacce: una lato cliente e una ristoratore. Il
cliente ha modo di ricercare dei ristoranti e di effettuare delle prenotazioni
presso un ristorante specificando la data e l'ora, il numero di persone ed
eventualmente anche i piatti che desidera ordinare. Non solo, attraverso il sito
web è possibile condividere un'ordinazione con altri utenti, in modo tale da
permettere ad utenti diversi di aggiungere le proprie ordinazioni ad una
medesima prenotazione.  
Il ristoratore ha modo di visualizzare le prenotazioni effettuate dai clienti e
di confermarle o meno. Inoltre, il ristoratore può visualizzare le ordinazioni
e gli ingredienti necessari per preparare i piatti ordinati, in questo modo
viene dato modo ai ristoratori di organizzarsi per tempo per la preparazione
dei piatti e per l'acquisto degli ingredienti.

## Installazione

Per installare Easy-Meal è necessario clonare la repository, infine è necessario
avere installato Docker e Docker Compose.
Avendo il daemon di Docker in esecuzione, di seguito sono riportati i comandi
per avviare il servizio la prima volta:

```bash
docker-compose up -d
```

In questo modo verrano create le 4 immagini Docker necessarie per il 
funzionamento dell'applicazione e verranno avviati i container. Dopo che le
immagini sono state create e i container avviati, è necessario creare le tabelle
nel database. Questo viene fatto accedendo tramite browser al link:

```
http://localhost:8000
```

In questo modo si accede alla pagina di amministrazione di Adminer, un tool per
la gestione di database. Le credenziali di accesso sono le seguenti:

- **System**: PostgreSQL
- **Server**: db
- **Username**: postgres
- **Password**: postgres
- **Database**: easymeal

Per cambiare le credenziali di accesso al database è sufficiente modificare il
file `docker-compose.yml`. Prestare attenzione perché è necessario modificare le
variabili d'ambiente sia del servizio `db` che del servizio `nest`, che si
connette al database.

Una volta effettuato l'accesso, è necessario creare le tabelle nel database.
Dunque bisogna selezionare la voce del menu ``Import``, poi ``Choose Files``. A
questo punto si apre una finestra di dialogo per selezionare il file da
importare. Bisogna importare il file 
[0000_gorgeous_natasha_romanoff.sql](backend/drizzle/0000_gorgeous_natasha_romanoff.sql) (`backend/drizzle/0000_gorgeous_natasha_romanoff.sql`).
e si clicca sul bottone ``Execute``, per eseguire i comandi SQL contenuti nel 
file.  

A prova di esempio è fornito un dump, ovvero un database popolato con dei dati
fasulli, che può essere importato per avere un'idea di come funziona 
l'applicazione. Proprio come prima, si seleziona la voce del menu ``Import``,
poi ``Choose Files`` e si seleziona il file
[populate.sql](backend/dump/populate.sql) (`backend/dump/populate.sql`).

A questo punto è possibile accedere all'applicazione tramite browser al link:

```
http://localhost:4200
```

## Utilizzo

Per gestire il software sono riportati alcuni comandi utili:

- **Avviare i container**: `docker-compose up -d`
- **Bloccare i container**: `docker-compose stop`
- **Riavviare i container**: `docker-compose restart`
- **Rimuovere i container**: `docker-compose down`
- **Visualizzare i log**: `docker-compose logs -f`
- **Ribuildare le immagini**: `docker-compose up -d --build`
- **Accedere al database**: `http://localhost:8000`
- **Rimouvere le immagini**: `docker compose down --rmi all`
- **Eseguire dei comandi nel container**: `docker-compose exec <service> <command>`
