import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(fr.default);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
