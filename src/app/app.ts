import { Component, computed, signal } from '@angular/core';
import { Ingredient, RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected current: number = 0;
  protected readonly title = signal<String>('My Recipe Box')
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
  protected readonly servings = signal(1);
  protected readonly adjustedIngredients = computed(() => {
    let array: Ingredient[] = [];
    this.recipe().ingredients.forEach((ing) => {
      array.push({
        name : ing.name,
        quantity : ing.quantity * this.servings(),
        unit: ing.unit
      })
    })
    return array;
  })

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

  protected servingsLess(): void {
    this.servings.update(s => s > 1 ? s - 1 : s)
  }

  protected servingsMore(): void {
    this.servings.update(s => s + 1)
  }
}
