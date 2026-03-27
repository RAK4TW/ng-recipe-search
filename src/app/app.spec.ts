import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/recipes',
            events: new EventTarget()
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent).toContain('My Recipe Box');
  });

  it('should hide add recipe button on add recipe route', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    Object.defineProperty(router, 'url', { value: '/recipes/add' });
    
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addButton = compiled.querySelector('a[href*="recipes/add"]');
    expect(addButton).toBeFalsy();
  });

  it('should show add recipe button on other routes', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    Object.defineProperty(router, 'url', { value: '/recipes' });
    
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addButton = compiled.querySelector('a[href*="recipes/add"]');
    expect(addButton).toBeTruthy();
  });
});
