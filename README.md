# collaborative-world-ui
Mundo Colaborativo UI: Busca conectar personas que poseen bienes que no utilicen, colaboradores que sean capaces de transportar esos bienes y carenciados que los requieran.

### Build
```bash
ionic build --prod
ionic capacitor build android --configuration=stg
```

### Prerequisite
```bash
src/environments/environment.secret.ts

export const secretEnv = {
  GOOGLE_MAPS_KEY: ''
};
```
### Start
```bash
npm start
npm run-script start:prod
npm run-script start:stg
npm run-script start:mock
ionic capacitor run andoid
```

### Inicialización
```bash
Este proyecto se creó utilizando Ionic, utilizando los siguientes comandos:
ionic init --multi-app
cd apps/core
ionic start "collaborative-world-ui"
    > type: Angular
    > template: Sidebar
    > capacitor: no
touch capacitor.config.json > info
npm install @capacitor/core @capacitor/cli
angular.json > replace all "app:" for "com.fmalessio.collaborativeworld.ui:"
ionic build
ionic capacitor add android
```

### Comandos útiles
```bash
ionic generate module [name] --routing=true/false
```