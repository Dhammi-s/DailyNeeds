import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service'; // 👈 Eh import karo
import { provideAnimations } from '@angular/platform-browser/animations'; // 👈 Added import

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // 👈 Zaroori hai
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideBrowserGlobalErrorListeners(),
    CookieService,
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
