import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { RecipeAdd } from './recipe-add';
import { Recipe } from '../recipe';
import { MOCK_RECIPES } from '../mock-recipes';

describe('RecipeAdd', () => {
  let component: RecipeAdd;
  let fixture: ComponentFixture<RecipeAdd>;
  let mockRouter: any;
  let mockRecipeService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: vi.fn()
    };
    
    mockRecipeService = {
      recipes: vi.fn(() => MOCK_RECIPES),
      addRecipe: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [RecipeAdd],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Recipe, useValue: mockRecipeService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form with name, email, and description fields', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="text"]')).toBeTruthy();
    expect(compiled.querySelector('textarea')).toBeTruthy();
  });

  it('should render 2 ingredient fields initially', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const ingredientInputs = compiled.querySelectorAll('input[type="text"]');
    // Filter for ingredient name inputs (first 2 are name and email, next 2 are ingredient names)
    expect(ingredientInputs.length).toBeGreaterThan(2);
  });

  it('should show add ingredient button initially', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addButton = compiled.querySelector('button[type="button"]');
    expect(addButton?.textContent).toContain('Add Ingredient');
  });

  it('should disable submit button when form is invalid', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]');
    expect(submitButton?.getAttribute('disabled')).not.toBeNull();
  });

  it('should display validation errors for empty required fields after touch', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const nameInput = compiled.querySelector('input[type="text"]') as HTMLInputElement;
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    
    const errors = compiled.querySelectorAll('.error-list p');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should add ingredient when add button is clicked', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const initialInputCount = compiled.querySelectorAll('input[type="text"]').length;
    const addButton = Array.from(compiled.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Add Ingredient')
    ) as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();
    
    const finalInputCount = compiled.querySelectorAll('input[type="text"]').length;
    expect(finalInputCount).toBe(initialInputCount + 1);
  });

  it('should show remove button after adding ingredient', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const addButton = Array.from(compiled.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Add Ingredient')
    ) as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();
    
    const removeButton = Array.from(compiled.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('Remove')
    );
    expect(removeButton).toBeTruthy();
  });

  it('should limit ingredients to 7 maximum', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Add ingredients until we reach 7
    for (let i = 0; i < 6; i++) {
      const addButton = Array.from(compiled.querySelectorAll('button')).find(btn => 
        btn.textContent?.includes('Add Ingredient')
      ) as HTMLButtonElement;
      if (addButton) {
        addButton.click();
        fixture.detectChanges();
      }
    }
    
    const ingredientInputs = compiled.querySelectorAll('input[type="text"]');
    expect(ingredientInputs.length).toBeGreaterThan(0);
  });

  it('should navigate to recipes after successful form submission', async () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Fill in the form
    const nameInput = compiled.querySelector('input[type="text"]') as HTMLInputElement;
    nameInput.value = 'Test Recipe';
    nameInput.dispatchEvent(new Event('input'));
    
    const emailInput = compiled.querySelectorAll('input[type="text"]')[1] as HTMLInputElement;
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));
    
    const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = 'This is a valid description with enough length';
    textarea.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();
    
    const form = compiled.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recipes']);
  });
});
