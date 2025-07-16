import { Component, Input, Output, EventEmitter} from '@angular/core';
import { dummyBeasts } from '../dummy-beasts';
import { speciesList } from '../species-list';
import { BestiaryEntry } from '../bestiary-entry.model';
import { CreatureDisplayComponent } from './creature-display-component';

@Component({
  selector: 'app-bestiary-list-display-component',
  imports: [CreatureDisplayComponent],
  templateUrl: './bestiary-list-display-component.html',
  styleUrl: './bestiary-list-display-component.css'
})
export class BestiaryListDisplayComponent {

 //dummyBeastList!: BestiaryEntry;
  dummyBeastsList = dummyBeasts;
  bestiarySpeciesList = speciesList;
  openCreatureInfo = false;
  displayCreatureName = "";
  @Output() creatureNameOutput = new EventEmitter(); 


   displaySublist(species: string){
    
    const filteredList = this.dummyBeastsList.filter((dbl) => dbl.species === species);
    return filteredList;
   }

   displayCreatureInfo(creatureName: string){
    this.openCreatureInfo = true;
    this.displayCreatureName = creatureName;
    return creatureName;
   }


   onReturn(){
    this.openCreatureInfo = false;
   }

 
}
