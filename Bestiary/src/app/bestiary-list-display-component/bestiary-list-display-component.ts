import { Component, Input, Output, EventEmitter, HostListener, OnInit, input} from '@angular/core';
import { dummyBeasts } from '../dummy-beasts';
import { speciesList } from '../species-list';
import { BestiaryEntry } from '../bestiary-entry.model';
import { CreatureDisplayComponent } from './creature-display-component';
import { trademark } from '../trademark';
import { response } from 'express';




@Component({
  selector: 'app-bestiary-list-display-component',
  imports: [CreatureDisplayComponent],
  templateUrl: './bestiary-list-display-component.html',
  styleUrl: './bestiary-list-display-component.css'
})


export class BestiaryListDisplayComponent implements OnInit {
  screenHeight!: number;
  screenWidth!: number;
  
  creatureJSON= require('../JSON Files/specieslists-just_species_and_beasts.json');


    ngOnInit(): void {
    
      this.bestiarySpeciesList = [];
      this.creatureList= [];
      this.currentSpeciesListCount = 0;
      this.creatureListCount = 0;
      for (var key in this.creatureJSON){
        this.bestiarySpeciesList[this.currentSpeciesListCount] = key;
        this.currentSpeciesListCount++;
        //console.log(this.bestiarySpeciesList)
    
    }

    const testname = this.creatureJSON.Ironlanders[0];

    //const test = JSON.stringify(this.creatureJSON);
    //const test2 = JSON.parse(test);

   // console.log(this.creatureJSON.values);
     for (var key in this.creatureJSON){
      //console.log(key);
      for (var creatureKey in this.creatureJSON[key]){
       // console.log("this is the current creature: " + creatureKey);
        dummyBeasts.push({species: key, name: creatureKey, rank: "", featurestraits: [], drives: [], tactics: [], desc: ""});
      }
      
      
    }
        
    }

    returnValues(key: string){

      
      return this.creatureJSON[key];

    }


  
// dummyBeastList!: BestiaryEntry;
  dummyBeastsList = dummyBeasts;
  creatureList!: string[];
  creatureListCount = 0;
  bestiarySpeciesList!: string[];
  dummyTrademark = trademark;
  openCreatureInfo = false;
  currentSpecies = "";
  displayCreatureName = "";
  currentCreatureCount = 0;
  currentSpeciesListCount = 0;
  isShowingCreatureSublist = false;
  creatureCount! : any;
  currentParsedJSONData = dummyBeasts;
  @Output() creatureNameOutput = new EventEmitter(); 
  @Output() isCreatureInfoShowingOutput = new EventEmitter();
  

 

   displaySublist(species: string){
    const filteredList = this.dummyBeastsList.filter((dbl) => dbl.species === species);
    return filteredList;
    
   }

   displayCreatureInfo(creatureName: string){
    
    this.openCreatureInfo = true;
    this.displayCreatureName = creatureName;
    return creatureName;
   }

   isCreatureInfoShowing(){
    return true;
   }


   onReturn(){
    this.openCreatureInfo = false;
   }

   displayCreatureSublist(species: string){
    
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
