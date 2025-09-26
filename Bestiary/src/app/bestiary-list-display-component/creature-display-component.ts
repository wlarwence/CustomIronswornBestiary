import { Component, Input} from '@angular/core';
import { BestiaryEntry } from '../bestiary-entry.model';

@Component({
  selector: 'app-creature-display-component',
  imports: [],
  templateUrl: './creature-display-component.html',
})
export class CreatureDisplayComponent {

  creatureList: BestiaryEntry[] = [];
  isDisplayOpen = true; /* TODO: unused, remove. */
  
  @Input ({required: true}) creatureNameInput!: string;
  /* TODO: can we just use creature name Input is ''/falsy instead of the below? */
  // TODO: OR let creature list display component handle it
  // TODO: OR merge logic from display component into here.
  @Input ({required: true}) isCreatureInfoShowingInput!: Boolean;

  onClose(){
    this.isCreatureInfoShowingInput= !this.isCreatureInfoShowingInput;
    return this.isCreatureInfoShowingInput;
  }

}
