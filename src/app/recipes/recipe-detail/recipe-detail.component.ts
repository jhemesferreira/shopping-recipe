import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
      private recipeService: RecipeService,
      private route: ActivatedRoute,
      private router: Router
      ){}

  ngOnInit(): void {
    this.route.data.subscribe(({recipe}) => {
      this.recipe = recipe;
      if(!this.recipe){
        this.router.navigate(['/recipes']);
      }
    })
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe():void {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
