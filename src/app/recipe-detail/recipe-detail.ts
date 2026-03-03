import { Component, computed, input, signal } from '@angular/core';
import { Ingredient, RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  readonly recipe = input.required<RecipeModel>()

  protected readonly servings = signal(1);
  protected readonly adjustedIngredients = computed(() => {
    let array: Ingredient[] = [];
    this.recipe().ingredients.forEach((ing) => {
      array.push({
        name: ing.name,
        quantity: ing.quantity * this.servings(),
        unit: ing.unit
      })
    })
    return array;
  })

  protected servingsLess(): void {
    this.servings.update(s => s > 1 ? s - 1 : s)
  }

  protected servingsMore(): void {
    this.servings.update(s => s + 1)
  }
}
