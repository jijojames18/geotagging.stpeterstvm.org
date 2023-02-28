# geotagging.stpeterstvm.org

Basic form used to collect user details. User can provide details such as name, phone number and directory id. To obtain the location of user, the geolocation of the user is obtained from the browser, which is then used to show a marker on the map. The user can select another location by placing another marker on the map. On submitting the form, the entered details are stored in a firebase collection.

## Environment Variables

The service requires a number of config data to be present as environment variables.

| Variable                     | Description               |
| ---------------------------- | ------------------------- |
| VITE_APP_RECAPTCHA_SITE_KEY  | Google ReCaptcha site key |
| VITE_APP_GOOGLE_MAPS_API     | Google Maps API Key       |
| VITE_APP_FIREBASE_SDK_CONFIG | Firebase SDK config       |

## Development flow

1. Clone the repository to your local machine.
2. Copy env.example as .env.
3. Replace the keys inside the .env with the correct values.
4. Run `npm install` and `npm run dev` to setup the local environment.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Reference

- [Google Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Admin Console](https://console.firebase.google.com/)
- [Google ReCaptcha](https://developers.google.com/recaptcha/intro)
