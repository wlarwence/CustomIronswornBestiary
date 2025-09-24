import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { BestiaryListDisplayComponent } from "./bestiary-list-display-component/bestiary-list-display-component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, BestiaryListDisplayComponent],
  templateUrl: './app.component.html',
})
export class App {
  protected title = 'Bestiary';
}
