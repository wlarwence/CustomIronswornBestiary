import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, appConfig )
  .catch((err) => console.error(err));


  bootstrapApplication(App, {
    providers: [provideHttpClient()]
  }).catch((err) => console.error(err));