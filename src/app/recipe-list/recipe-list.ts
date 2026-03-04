import { Component, computed, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeDetail } from "../recipe-detail/recipe-detail";
import { Recipe } from '../recipe';
@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {

  protected current = signal(0);
  protected readonly searchTerm = signal('');
  protected recipesService = inject(Recipe);
  

  protected readonly filteredRecipes = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.recipesService.recipes().filter((dish) => {
      return dish.name.toLowerCase().includes(term);
    })
  }
  )

  protected readonly recipe = computed(() => {
    return this.filteredRecipes()[this.current()] || this.filteredRecipes()[0]
  })


  protected prevRecipe(): void {
    if (this.current() != 0) {
      this.current.update(c => c - 1)
    }
  }

  protected nextRecipe(): void {
    if (this.current() != this.filteredRecipes().length - 1) {
      this.current.update(c => c + 1);
    }
  }
}
