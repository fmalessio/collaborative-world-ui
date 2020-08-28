# collaborative-world-ui
Mundo Colaborativo UI: Busca conectar personas que poseen bienes que no utilicen, colaboradores que sean capaces de transportar esos bienes y carenciados que los requieran.

### Build
ionic build --prod\
ionic capacitor build android

### Start
npm start

### Inicialización
Este proyecto se creó utilizando Ionic, utilizando los siguientes comandos:\
ionic init --multi-app\
cd apps/core\
ionic start "collaborative-world-ui"\
    > type: Angular\
    > template: Sidebar\
    > capacitor: no\
touch capacitor.config.json > info\
npm install @capacitor/core @capacitor/cli\
angular.json > replace all "app:" for "com.fmalessio.collaborativeworld.ui:"\
ionic build\
ionic capacitor add android\

### Comandos útiles
ionic generate module [name] --routing=true/false\
ionic generate module [name] --route [name] --module app.module