import { bootstrapApplication } from '@angular/platform-browser';
import { TimezoneComponent } from './app/timezone/timezone.component';

bootstrapApplication(TimezoneComponent)
  .catch(err => console.error('App Bootstrap Error:', err));
