import { ApplicationConfig, importProvidersFrom,  provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { authIntercepter } from './auth/auth.service';
import { tap } from 'rxjs';


// change this socket ! TODO 
const config: SocketIoConfig = {
  url: 'http://127.0.0.1:5000', options: {

  }
};





export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authIntercepter])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(SocketIoModule.forRoot(config))
    ]
};
