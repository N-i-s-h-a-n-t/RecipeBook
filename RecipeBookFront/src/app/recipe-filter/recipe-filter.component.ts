import { Component } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';
import { FormBuilder } from '@angular/forms';
import { Recipe } from '../core/model/recipe.model';

@Component({
  selector: 'app-recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.scss']
})
export class RecipeFilterComponent {
  constructor(private service: RecipesService, private fb: FormBuilder) {}

  recipeForm = this.fb.group({
    title: [''],
    category: [''],
    ingredient: [''],
    tags: [''],
    prepTime: [''],
    cookingTime: [''],
  });

  filterResults() {
    console.log(this.recipeForm.value);
    this.service.updateFilter(this.recipeForm.value);
  }

  clearFilter() {}
}
