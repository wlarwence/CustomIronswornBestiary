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
  isDisplayOpen = true;
  
  i = 0;
  @Input ({required: true}) creatureNameInput!: string;
  @Input ({required: true}) isCreatureInfoShowingInput!: Boolean;


  onClose(){
    this.isCreatureInfoShowingInput= !this.isCreatureInfoShowingInput;
    return this.isCreatureInfoShowingInput;
  }

}
