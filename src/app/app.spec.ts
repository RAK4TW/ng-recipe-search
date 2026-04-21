import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';
import { of, Subject } from 'rxjs';
import { App } from './app';

describe('App', () => {
  let mockRouter: any;
  let eventsSubject: Subject<any>;

  beforeEach(async () => {
    eventsSubject = new Subject();
    
    mockRouter = {
      url: '/recipes',
      events: eventsSubject.asObservable(),
      navigate: vi.fn(),
      createUrlTree: vi.fn(() => ({ toString: () => '/recipes' })),
      serializeUrl: vi.fn(() => '/recipes')
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: {}
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
    eventsSubject.next({ urlAfterRedirects: '/recipes' });
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent).toContain('My Recipe Box');
  });

  it('should hide add recipe button on add recipe route', async () => {
    const fixture = TestBed.createComponent(App);
    eventsSubject.next({ urlAfterRedirects: '/recipes/add' });
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addButton = compiled.querySelector('a[href*="recipes/add"]');
    expect(addButton).toBeFalsy();
  });

  it('should show add recipe button on other routes', async () => {
    const fixture = TestBed.createComponent(App);
    eventsSubject.next({ urlAfterRedirects: '/recipes' });
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addButton = Array.from(compiled.querySelectorAll('a')).find(a => a.textContent?.includes('Add Recipe'));
    expect(addButton).toBeTruthy();
  });
});
