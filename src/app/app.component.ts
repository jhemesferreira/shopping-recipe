import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-recipe';
  activedLink = 'recipe';

  onNavigate(targetLink : string){
    this.activedLink = targetLink;
  }
}
