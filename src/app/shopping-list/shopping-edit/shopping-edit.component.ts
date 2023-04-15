import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  indexIngredientEdit: number;
  editMode = false;
  subscription: Subscription;

  @ViewChild('formShopping') formShopping: NgForm;
  @Output() setIngredient = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientEdit.subscribe((index: number) => {
      this.editMode = true;
      this.indexIngredientEdit = index;
      const { name, amount } = this.shoppingListService.getIngredient(this.indexIngredientEdit);
      this.formShopping.setValue({
        'name': name,
        'amount': amount
      });

    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAdd(){
    const name = this.formShopping.value.name;
    const amount = this.formShopping.value.amount;
    if(!this.editMode){
      const ingredient = new Ingredient
      (
          this.formShopping.value.name,
          this.formShopping.value.amount
      );
      this.shoppingListService.addIngredient(ingredient);
    }else{
      this.shoppingListService.editIngredient(
        this.indexIngredientEdit,
        { name , amount });
      this.editMode = false;
    }
    this.formShopping.reset();
  }
}
