import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';

import { RecipeList } from './recipe-list';
import { Recipe } from '../recipe';
import { MOCK_RECIPES } from '../mock-recipes';

describe('RecipeList', () => {
  let component: RecipeList;
  let fixture: ComponentFixture<RecipeList>;
  let mockRecipeService: any;

  beforeEach(async () => {
    mockRecipeService = {
      recipes: vi.fn(() => MOCK_RECIPES)
    };

    await TestBed.configureTestingModule({
      imports: [RecipeList, FormsModule, RouterLink],
      providers: [
        { provide: Recipe, useValue: mockRecipeService },
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all recipes initially', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const recipeLinks = compiled.querySelectorAll('a[href*="/recipes/"]');
    expect(recipeLinks.length).toBe(8);
  });

  it('should display recipe names as links', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const firstLink = compiled.querySelector('a') as HTMLAnchorElement;
    expect(firstLink).toBeTruthy();
    expect(firstLink.textContent).toContain('Spaghetti Carbonara');
    expect(firstLink.getAttribute('href')).toContain('/recipes/');
  });

  it('should filter recipes when search term is entered', () => {
    fixture.detectChanges();
    // Use 'carbonara' which is in the recipe name
    component['searchTerm'].set('carbonara');
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const recipeLinks = compiled.querySelectorAll('a[href*="/recipes/"]');
    expect(recipeLinks.length).toBe(1);
  });

  it('should show no results message when search has no matches', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'nonexistent';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const recipeLinks = compiled.querySelectorAll('a[href*="/recipes/"]');
    const noResultsMessage = compiled.querySelector('p');
    expect(recipeLinks.length).toBe(0);
    expect(noResultsMessage?.textContent).toContain('No recipes match the search');
  });

  it('should display favorite badge for favorite recipes', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const favoriteBadges = compiled.querySelectorAll('.bg-red-500');
    expect(favoriteBadges.length).toBeGreaterThan(0);
  });

  it('should have search input placeholder', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input') as HTMLInputElement;
    expect(input.placeholder).toContain('Search recipes');
  });

  it('should filter recipes case-insensitively', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'CARBONARA';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const recipeLinks = compiled.querySelectorAll('a[href*="/recipes/"]');
    expect(recipeLinks.length).toBe(1);
  });

  it('should clear filter when search term is empty', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'pasta';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const recipeLinks = compiled.querySelectorAll('a[href*="/recipes/"]');
    expect(recipeLinks.length).toBe(8);
  });
});
