import { secretEnv } from "./environment.secret";

export const environment = {
  production: true,
  endpoint: '',
  googleMapsKey: secretEnv.GOOGLE_MAPS_KEY
};
