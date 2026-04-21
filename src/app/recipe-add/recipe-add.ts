import { Component, inject, signal } from '@angular/core';
import { form, required, email, FormField, submit, minLength } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../recipe';
import { Ingredient, RecipeModel } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [FormField, MatButtonModule],
  templateUrl: './recipe-add.html',
  styleUrl: './recipe-add.css',
})
export class RecipeAdd {

  protected recipesService = inject(Recipe);
  protected router = inject(Router);
  protected readonly units = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'each', 'cloves', 'sprigs', 'bunch', 'sheets', 'baguette', 'head'];
  
  protected readonly addRecipeModel = signal({
    name: '',
    authorEmail: '',
    description: '',
    isFavorite: false,
    ingredients: [
      { name: '', quantity: 1, unit: 'g' },
      { name: '', quantity: 1, unit: 'g' }
    ]
  });

  protected readonly addRecipeForm = form(this.addRecipeModel, (path) => {
    required(path.name, { message: 'A name is required.'});
    required(path.authorEmail);
    email(path.authorEmail, {message: 'Please use a valid email, i.e. example@example.com'});
    required(path.description, { message: 'A description is required.'});
    minLength(path.description, 10);
  });

  protected addIngredient(): void {
    const currentIngredients = this.addRecipeModel().ingredients;
    if (currentIngredients.length < 7) {
      this.addRecipeModel.update(model => ({
        ...model,
        ingredients: [...model.ingredients, { name: '', quantity: 0, unit: 'g' }]
      }));
    }
  }

  protected removeIngredient(index: number): void {
    const currentIngredients = this.addRecipeModel().ingredients;
    if (currentIngredients.length > 2) {
      this.addRecipeModel.update(model => ({
        ...model,
        ingredients: model.ingredients.filter((_, i) => i !== index)
      }));
    }
  }

  protected canAddMoreIngredients(): boolean {
    return this.addRecipeModel().ingredients.length < 7;
  }

  protected canRemoveIngredient(): boolean {
    return this.addRecipeModel().ingredients.length > 2;
  }

  protected async save(): Promise<void> {
    await submit(this.addRecipeForm, async () => {

      const formValue = this.addRecipeModel();
      const ingredients: Ingredient[] = formValue.ingredients
        .filter(ing => ing.name.trim() !== '')
        .map(ing => ({
          name: ing.name.trim(),
          quantity: ing.quantity || 1,
          unit: ing.unit
        }));

      const newRecipe: RecipeModel = {
        id: Date.now(),
        name: formValue.name,
        description: formValue.description,
        authorEmail: formValue.authorEmail,
        imgUrl: 'https://placehold.co/600x400?text=New+Recipe',
        isFavorite: false,
        ingredients: ingredients
      };

      this.recipesService.addRecipe(newRecipe);
      this.addRecipeForm().reset();
      this.addRecipeModel.set({
        name: '',
        authorEmail: '',
        description: '',
        isFavorite: false,
        ingredients: [
          { name: '', quantity: 1, unit: 'g' },
          { name: '', quantity: 1, unit: 'g' }
        ]
      });
      this.router.navigate(['/recipes']);
    })
  }
}
