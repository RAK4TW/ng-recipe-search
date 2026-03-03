import { Component, computed, signal } from '@angular/core';
import { Ingredient, RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeDetail } from "../recipe-detail/recipe-detail";
@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {

protected current: number = 0;
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
 

  protected prevRecipe(): void {
    if (this.current != 0) {
      this.current = this.current - 1;
      this.recipe.set(MOCK_RECIPES[this.current])
    }
  }

  protected nextRecipe(): void {
    if (this.current != (Object.entries(MOCK_RECIPES).length - 1)) {
      this.current = this.current + 1;
      this.recipe.set(MOCK_RECIPES[this.current])
    }
  }
}
