import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-add',
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './recipe-add.html',
  styleUrl: './recipe-add.css',
})
export class RecipeAdd {

  protected readonly addRecipeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingredient1: new FormControl(''),
    ingredient2: new FormControl(''),
    ingredient3: new FormControl(''),
    ingredient4: new FormControl(''),
    ingredient5: new FormControl(''),
  })

  protected submitRecipe(): void {
    console.log(
      [this.addRecipeForm.value]
    )
    this.addRecipeForm.reset();
  }

}
