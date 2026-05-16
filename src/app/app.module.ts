import { ApplicationConfig } from '@angular/core'; // 👈 Eh zaroori hai
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... baki providers (e.g., provideHttpClient())
    CookieService
  ]
};
