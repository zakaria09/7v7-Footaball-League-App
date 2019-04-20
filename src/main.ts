import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));

    platformBrowserDynamic().bootstrapModule(AppModule).then(() => { 
      if (environment.production && 'serviceWorker' in navigator) { 
        navigator.serviceWorker.getRegistration() 
        .then(active => !active && navigator.serviceWorker
          .register('/ngsw-worker.js')) .catch(console.error); } });
    
// didn't realise to add
// this to get icons
import './icons';
