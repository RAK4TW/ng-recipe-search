import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' }) // This makes it available everywhere
export class Auth {
  readonly user = signal('Guest');
}