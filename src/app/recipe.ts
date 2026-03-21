import { Injectable, signal } from '@angular/core';
import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
   private readonly _recipes = signal<RecipeModel[]>([...MOCK_RECIPES]);
   public readonly recipes = this._recipes.asReadonly();


  getRecipeById(id: number) {
    return this.recipes().find(recipe => recipe.id === id);
  }

  addRecipe(newRecipe : RecipeModel) {
    this._recipes.update(list => [...list, newRecipe])
  }
}
