# Projet VetDoc

[![API Healthcheck](https://github.com/ThibautSembeni/challenge_s5/workflows/api_healthcheck/badge.svg)](https://github.com/ThibautSembeni/challenge_s5/actions?query=workflow%3Aapi_healthcheck)
[![Back Tests Status](https://github.com/ThibautSembeni/challenge_s5/workflows/back_tests/badge.svg)](https://github.com/ThibautSembeni/challenge_s5/actions?query=workflow%3Aback_tests)
[![Front Tests Status](https://github.com/ThibautSembeni/challenge_s5/workflows/front_tests/badge.svg)](https://github.com/ThibautSembeni/challenge_s5/actions?query=workflow%3Afront_tests)


Projet VetDoc est une application inspirée de Doctolib, mais spécialisée pour les vétérinaires. L'objectif de cette plateforme est de faciliter l'intégration des vétérinaires en leur offrant un système de prise de rendez-vous avec des créneaux horaires, etc.

## Sommaire

- [Installation et Démarrage](#installation-et-démarrage)
    - [React.js (Client)](#reactjs)
    - [API Platform](#api-platform)
    - [Commandes supplémentaires](#commandes-supplémentaires)
- [Membres de l'équipe](#membres-de-léquipe)

## Installation et Démarrage

### React.js

Pour démarrer l'application React.js, suivez ces étapes :

1. Accédez au dossier `client` :

```bash
cd client
```

2. Installez les dépendances :

```bash
npm install
```

3. Lancez l'application en mode développement :

```bash
npm run dev
```

4. Pour mettre en production :

```bash
npm run build
npm run start
```


### API Platform

Pour installer et démarrer API Platform, utilisez les commandes suivantes :

1. Construire les conteneurs Docker :

```bash
docker-compose build
```

2. Installer les dépendances PHP :

```bash
docker-compose run php composer install -o
```

3. Générer la paire de clés JWT :

```bash
docker-compose run php php bin/console lexik:jwt:generate-keypair --overwrite --no-interaction
```

4. Démarrer le projet :

```bash
docker-compose up -d --remove-orphans
```

5. Créer la base de données si elle n'existe pas :

```bash
docker-compose exec php php bin/console doctrine:database:create --if-not-exists
```


6. Exécuter les migrations :

```bash
docker-compose exec php php bin/console doctrine:migrations:migrate -n
```

### Exécution des tests clients avec Playwright

Pour exécuter les tests avec [Playwright](https://playwright.dev/docs/writing-tests), suivez ces étapes :

1. Assurez-vous que Playwright est installé. Si ce n'est pas le cas, vous pouvez l'installer avec npm :

```bash
npm install playwright
```
2. Pour exécuter les tests, utilisez la commande suivante :
```bash
npx playwright test
```
Cette commande exécutera tous les tests dans le répertoire tests de votre projet. 

3. Pour afficher les resultats des tests, utilisez la commande suivante :
```bash
npx playwright show-report
```
Cette commande affichera les résultats des tests dans le navigateur.
### Commandes supplémentaires

- Pour accéder à un shell PHP :

```bash
docker-compose exec php sh
```
- Pour générer une migration :
```bash
docker-compose exec php php bin/console make:migration -n
```

- Pour effectuer une migration :
```bash
docker-compose exec php php bin/console doctrine:migrations:migrate -n
```

- Pour installer les dépendances avec Composer :
```bash
docker-compose run php composer install -o
```

- Pour charger des données factices :
```bash
docker-compose exec php php bin/console hautelook:fixture:load --no-interaction
```

- Pour vider le cache :
```bash
docker-compose exec php php bin/console cache:clear
```
- Pour réinitialiser la base de données :
```bash
docker-compose down database --volumes
docker-compose up -d database
docker-compose exec php php bin/console doctrine:database:create --if-not-exists
docker-compose exec php php bin/console doctrine:migrations:migrate -n
```
- Pour exporter le fichier swagger: (vous pouvez l'importer sur postman)
```bash
docker compose exec php bin/console api:openapi:export --output=swagger_docs.json
```
## Liens utiles
- Pour accéder la documentation de API Platform : http://localhost:8888/api/docs
- Pour accéder à de l'application React.js : http://localhost:5173

## Membres de l'équipe

- Romain Lethumier (Pseudo GitHub: `romain0201`)
- Chemlal Morade (Pseudo GitHub: `mchemlal`)
- Samy Amallah (Pseudo GitHub: `Choetsu`)
- Thibaut Sembeni (Pseudo GitHub: `ThibautSembeni`)

