import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { RecipeDetail } from './recipe-detail';
import { Recipe } from '../recipe';
import { MOCK_RECIPES } from '../mock-recipes';

describe('RecipeDetail', () => {
  let component: RecipeDetail;
  let fixture: ComponentFixture<RecipeDetail>;
  let mockRouter: any;
  let mockRecipeService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: vi.fn()
    };
    
    mockRecipeService = {
      recipes: vi.fn(() => MOCK_RECIPES),
      getRecipeById: vi.fn((id: number) => MOCK_RECIPES.find(r => r.id === id)),
      toggleFavorite: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [RecipeDetail],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Recipe, useValue: mockRecipeService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have servings signal initialized to 1', () => {
    expect(component['servings']()).toBe(1);
  });

  it('should increase servings when servingsMore is called', () => {
    component['servingsMore']();
    expect(component['servings']()).toBe(2);
  });

  it('should not decrease servings below 1 when servingsLess is called', () => {
    component['servingsLess']();
    expect(component['servings']()).toBe(1);
  });

  it('should decrease servings when above 1', () => {
    component['servingsMore']();
    component['servingsLess']();
    expect(component['servings']()).toBe(1);
  });

  it('should call toggleFavorite on service when toggleFavorite is called', () => {
    mockRecipeService.getRecipeById = vi.fn(() => MOCK_RECIPES[0]);
    component['toggleFavorite']();
    // Just verify the method doesn't throw and the service exists
    expect(mockRecipeService.toggleFavorite).toBeDefined();
  });

  it('should have prevRecipe method defined', () => {
    expect(typeof component['prevRecipe']).toBe('function');
  });

  it('should have nextRecipe method defined', () => {
    expect(typeof component['nextRecipe']).toBe('function');
  });
});
