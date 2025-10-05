import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SpinGame } from './spin-game/spin-game';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: SpinGame }
    ])
  ]
};
