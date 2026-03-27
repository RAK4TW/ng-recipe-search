import { Component, signal,  } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { computed } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal<String>('My Recipe Box');
    protected readonly currentUrl = signal('');
    
    constructor(private router: Router) {
        this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe(event => {
            this.currentUrl.set(event.urlAfterRedirects);
        });
    }
    
    protected readonly isAddRecipeRoute = computed(() => {
        return this.currentUrl().includes('/recipes/add');
    });
}
