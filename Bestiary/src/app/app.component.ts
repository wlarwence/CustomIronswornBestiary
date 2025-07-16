import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { BestiaryListDisplayComponent } from "./bestiary-list-display-component/bestiary-list-display-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, BestiaryListDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected title = 'Bestiary';
}
