import { Component, computed, inject, input, signal } from '@angular/core';
import { Ingredient, } from '../models';
import { Router } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  private readonly router = inject(Router);
  protected recipesService = inject(Recipe);
  protected readonly id = input<string>();
  protected readonly recipe = computed(() => {
    return this.recipesService.getRecipeById(Number(this.id()))
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
  protected readonly currentIndex = computed(() => {
    return this.recipesService.recipes().findIndex(r => r.id === Number(this.id()));
  })

  protected readonly prevId = computed(() => {
    const index = this.currentIndex();
    return index > 0 ? this.recipesService.recipes()[index - 1].id : null;
  });

  protected readonly nextId = computed(() => {
    const index = this.currentIndex();
    const recipes = this.recipesService.recipes();
    return index !== -1 && index < recipes.length - 1 ? recipes[index + 1].id : null;
  });

  protected servingsLess(): void {
    this.servings.update(s => s > 1 ? s - 1 : s)
  }

  protected servingsMore(): void {
    this.servings.update(s => s + 1)
  }

  protected toggleFavorite(): void {
    const recipe = this.recipe();
    if (recipe) {
      this.recipesService.toggleFavorite(recipe.id);
    }
  }

  protected prevRecipe(): void {
    const id = this.prevId();
    if (id !== null) {
      this.router.navigate(['/recipes', id]);
    }
  }

  protected nextRecipe(): void {
    const id = this.nextId();
    if (id !== null) {
      this.router.navigate(['/recipes', id]);
    }
  }

}
