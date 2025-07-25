import { Component, Input, Output, EventEmitter, HostListener, OnInit} from '@angular/core';
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
  screenHeight!: number;
  screenWidth!: number;



 //dummyBeastList!: BestiaryEntry;
  dummyBeastsList = dummyBeasts;
  bestiarySpeciesList = speciesList;
  openCreatureInfo = false;
  currentSpecies = "";
  displayCreatureName = "";
  isShowingCreatureSublist = false;
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

   displayCreatureSublist(species: string){
    
    //this.isShowingCreatureSublist = true;
      //this.openCreatureInfo = false;
     if(species === this.currentSpecies){
      this.isShowingCreatureSublist = !this.isShowingCreatureSublist;
     }

   
     if(species != this.currentSpecies){
      this.isShowingCreatureSublist = true;
     }

    this.currentSpecies = species;
    return this.isShowingCreatureSublist;
   }

   updateWindowSize(){
    window.addEventListener("resize", this.updateWindowSize);
    this.screenWidth = window.innerWidth;
   }

  
}
