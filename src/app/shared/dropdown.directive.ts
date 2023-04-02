import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  'selector': '[appDropdown]'
})
export class DropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2){}

  @HostBinding('class.show') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(eventData: Event){
   const menu = this.elRef.nativeElement.querySelector('.dropdown-menu');
   this.isOpen = this.elRef.nativeElement.contains(eventData.target) ? !this.isOpen : false;
   if(this.isOpen){
      this.renderer.addClass(menu, 'show')
    }else{
      this.renderer.removeClass(menu, 'show')
    }

  }
}
