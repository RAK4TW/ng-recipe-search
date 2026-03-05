import { Component, computed, inject, signal } from '@angular/core';
import { Ingredient, RecipeModel } from '../models';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  protected recipesService = inject(Recipe);
  private readonly route = inject(ActivatedRoute);
  protected readonly recipeId = this.route.snapshot.params['id']

  protected readonly recipe = computed(() => {
    return this.recipesService.getRecipeById(Number(this.recipeId))
  })

  protected readonly servings = signal(1);
  protected readonly adjustedIngredients = computed(() => {
    let array: Ingredient[] = [];
    this.recipe()?.ingredients.forEach((ing) => {
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

  // protected prevRecipe(): void {
  //   if (this.recipe() != 0) {
  //     this.current.update(c => c - 1)
  //   }
  // }

  // protected nextRecipe(): void {
  //   if (this.current() != this.recipesService.recipes.length - 1) {
  //     this.current.update(c => c + 1);
  //   }
  // }
}
