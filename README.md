
# 🍽️ Easy-Meal

Easy-Meal è una web app progettata per semplificare l'interazione tra utenti e ristoranti. Easy-Meal offre due interfacce: una per i clienti e una per i ristoratori.

### 🌟 Funzionalità Cliente
- 🔍 Ricerca ristoranti
- 📅 Effettuazione di prenotazioni specificando data, ora, numero di persone e piatti desiderati
- 👥 Condivisione dell'ordinazione con altri utenti per permettere ad ognuno di aggiungere le proprie ordinazioni a una prenotazione comune

### 🛠️ Funzionalità Ristoratore
- 📋 Visualizzazione e conferma delle prenotazioni effettuate dai clienti
- 🍲 Visualizzazione delle ordinazioni e degli ingredienti necessari per preparare i piatti, permettendo una migliore organizzazione

## 🛠️ Installazione

Per installare Easy-Meal, è necessario clonare la repository. Inoltre, assicurati di avere Docker e Docker Compose installati.

Con il daemon di Docker in esecuzione, esegui i seguenti comandi per avviare il servizio per la prima volta:

```bash
docker-compose up -d
```

Questo comando creerà le 4 immagini Docker necessarie per il funzionamento dell'applicazione e avvierà i container. Dopo la creazione delle immagini e l'avvio dei container, sarà necessario creare le tabelle nel database accedendo tramite browser al seguente link: 

[Adminer](http://localhost:8000) o inserendo nella barra di ricerca l' indirizzo `http://localhost:8000` 


Accederai alla pagina di amministrazione di Adminer, un tool per la gestione dei database. Utilizza le seguenti credenziali di accesso:

- **System**: PostgreSQL
- **Server**: db
- **Username**: postgres
- **Password**: postgres
- **Database**: easymeal

### 🔐 Modifica delle Credenziali

Per cambiare le credenziali di accesso al database, modifica il file `docker-compose.yml`. Assicurati di aggiornare le variabili d'ambiente sia del servizio `db` che del servizio `nest`, che si connette al database.

### 📦 Migrazione

È fornito un dump con dati fasulli per esempio. Per importarlo:
1. Entrando nella cartella `backend`
2. Eseguendo ``npm run postgres-load``

Ora puoi accedere all'applicazione tramite browser al link:

[Web App](http://localhost:4200) o inserendo nella barra degli indirizzi l'indirizzo `http://localhost:4200`

## 🧰 Utilizzo

Ecco alcuni comandi utili per gestire il software:

- **🚀 Avviare i container**: `docker-compose up -d`
- **🛑 Bloccare i container**: `docker-compose stop`
- **🔄 Riavviare i container**: `docker-compose restart`
- **🗑️ Rimuovere i container**: `docker-compose down`
- **📜 Visualizzare i log**: `docker-compose logs -f`
- **🔧 Ribuildare le immagini**: `docker-compose up -d --build`
- **🔑 Accedere al database**: `http://localhost:8000`
- **🧹 Rimuovere le immagini**: `docker-compose down --rmi all`
- **🖥️ Eseguire comandi nei container**: `docker-compose exec <service> <command>`
