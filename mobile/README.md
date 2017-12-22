# Client mobile Chronos

## Installation

### Installer les dépendances
```
$ npm install
```

### Variables d’environnement

Créer un fichier local *components/config/config.js* qui contient :

```js
exports.apiKey = "OpenWeatherMap_APIKey";
```

Avec `OpenWeatherMap_APIKey` qui est la clé unique liée à notre compte :

- Se connecter sur le site https://home.openweathermap.org/ (login/mdp de l'adresse mail commune)
- Accéder au profil > <kbd>API Keys</kbd> pour voir la clé unique liée au compte

## Running
```
$ npm start
```