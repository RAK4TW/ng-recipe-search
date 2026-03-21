import { Component, inject, signal } from '@angular/core';
import { form, required, email, FormField, submit, minLength } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../recipe';
import { Ingredient, RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [FormField, MatButtonModule],
  templateUrl: './recipe-add.html',
  styleUrl: './recipe-add.css',
})
export class RecipeAdd {

  protected recipesService = inject(Recipe);
  protected readonly addRecipeModel = signal({
    name: '',
    authorEmail: '',
    description: '',
    ingredient1: '',
    ingredient2: '',
    ingredient3: '',
    ingredient4: '',
    ingredient5: ''
  });

  protected readonly addRecipeForm = form(this.addRecipeModel, (path) => {
    required(path.name, { message: 'A name is required.'});
    required(path.authorEmail);
    email(path.authorEmail, {message: 'Please use a valid email, i.e. example@example.com'});
    required(path.description, { message: 'A description is required.'});
    minLength(path.description, 10);
    required(path.ingredient1, { message: 'At least one ingredient is needed'});
  });

  protected async save(): Promise<void> {
    await submit(this.addRecipeForm, async () => {

      const formValue = this.addRecipeModel();
      const ingredients: Ingredient[] = [
        formValue.ingredient1,
        formValue.ingredient2,
        formValue.ingredient3,
        formValue.ingredient4,
        formValue.ingredient5
      ].filter(name => name.trim() !== '').map(name => ({ name, quantity: 1, unit: 'pcs' }));

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
        ingredient1: '',
        ingredient2: '',
        ingredient3: '',
        ingredient4: '',
        ingredient5: ''
      }
      )
    })
  }
}
