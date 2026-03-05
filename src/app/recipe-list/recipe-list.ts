import { Component, computed, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-recipe-list',
  imports: [FormsModule, RouterLink],
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



}
