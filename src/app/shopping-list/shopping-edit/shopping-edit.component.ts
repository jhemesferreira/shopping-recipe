import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef : ElementRef;
  @ViewChild('numberInput') numberInputRef : ElementRef;
  @Output() setIngredient = new EventEmitter<Ingredient>();

  onAdd(){
    const ingredient = new Ingredient(this.nameInputRef.nativeElement.value, this.numberInputRef.nativeElement.value);
    this.setIngredient.emit(ingredient);
    this.nameInputRef.nativeElement.value = '';
    this.numberInputRef.nativeElement.value = '';
  }
}
