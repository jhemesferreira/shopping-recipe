import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  @Output() changeLink = new EventEmitter<string>();

  onSetlink(targetLink: string) {
    this.changeLink.emit(targetLink);
  }
}
