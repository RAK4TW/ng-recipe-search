import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { RecipeList } from './recipe-list';
import { Recipe } from '../recipe';
import { MOCK_RECIPES } from '../mock-recipes';

describe('RecipeList', () => {
  let component: RecipeList;
  let fixture: ComponentFixture<RecipeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeList, FormsModule, RouterLink],
      providers: [
        { provide: Recipe, useValue: { recipes: () => MOCK_RECIPES } }
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

  it('should filter recipes when search term is entered', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'pasta';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const recipeLinks = compiled.querySelectorAll('a[href*="/recipes/"]');
    expect(recipeLinks.length).toBe(1);
    expect(recipeLinks[0].textContent).toContain('Spaghetti Carbonara');
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
});
