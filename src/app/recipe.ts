import { Injectable, signal } from '@angular/core';
import { MOCK_RECIPES } from './mock-recipes';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  readonly recipes = signal(MOCK_RECIPES);

  getRecipeById(id:number) {
    return this.recipes().find(recipe => recipe.id === id);
  }
}
