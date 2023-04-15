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

  onSubmit(): void{
    const value = this.formShopping.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(!this.editMode){
      this.shoppingListService.addIngredient(newIngredient);
    }else{
      this.shoppingListService.editIngredient(
        this.indexIngredientEdit,
        newIngredient);
      this.editMode = false;
    }
    this.onClearForm();
  }

  onDelete(): void {
    if(this.editMode){
      this.shoppingListService.deleteIngredient(this.indexIngredientEdit);
      this.onClearForm();
    }
  }

  onClearForm(): void {
    this.formShopping.reset();
    this.editMode = false;
  }
}
