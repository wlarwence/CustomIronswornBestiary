import { Component, Input} from '@angular/core';
import { BestiaryEntry } from '../bestiary-entry.model';


@Component({
  selector: 'app-creature-display-component',
  imports: [],
  templateUrl: './creature-display-component.html',
})
export class CreatureDisplayComponent {
  @Input({required: false}) creatureNameInput!: BestiaryEntry[];
}
