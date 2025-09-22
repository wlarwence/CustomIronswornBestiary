import { Component, Input} from '@angular/core';
import { dummyBeasts } from '../dummy-beasts';

@Component({
  selector: 'app-creature-display-component',
  imports: [],
  templateUrl: './creature-display-component.html',
  styleUrl: './creature-display-component.css'
})
export class CreatureDisplayComponent {

  creatureList = dummyBeasts;
  isDisplayOpen = true;
  
  @Input ({required: true}) creatureNameInput!: string;
  @Input ({required: true}) isCreatureInfoShowingInput!: Boolean;


  onClose(){
    this.isCreatureInfoShowingInput= !this.isCreatureInfoShowingInput;
    return this.isCreatureInfoShowingInput;
  }

}
