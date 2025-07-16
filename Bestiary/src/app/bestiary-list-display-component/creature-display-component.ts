import { Component, Input, Output, EventEmitter } from '@angular/core';
import { dummyBeasts } from '../dummy-beasts';
import { speciesList } from '../species-list';
import { BestiaryEntry } from '../bestiary-entry.model';

@Component({
  selector: 'app-creature-display-component',
  imports: [],
  templateUrl: './creature-display-component.html',
  styleUrl: './creature-display-component.css'
})
export class CreatureDisplayComponent {

  creatureList = dummyBeasts;
  @Input ({required: true}) creatureNameInput!: string;
}
