import { Component, Input, Output, EventEmitter, HostListener, OnInit, input, signal, inject, DestroyRef} from '@angular/core';
import { dummyBeasts } from '../dummy-beasts';
import { speciesList } from '../species-list';
import { BestiaryEntry } from '../bestiary-entry.model';
import { CreatureDisplayComponent } from './creature-display-component';
import { trademark } from '../trademark';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { subscribeOn } from 'rxjs';
import { environment } from '../../environments/environment';






@Component({
  selector: 'app-bestiary-list-display-component',
  imports: [CreatureDisplayComponent],
  templateUrl: './bestiary-list-display-component.html',
  styleUrl: './bestiary-list-display-component.css'
})


export class BestiaryListDisplayComponent implements OnInit {
  screenHeight!: number;
  screenWidth!: number;
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

  testSignal = signal<object | undefined>(undefined);


  //The JSON for the creature info+ the variables to hold teh current creature info
  creatureJSON!: any;
  natureJSON!: any;
  currentCreatureDesc!: string;
  currentCreatureDrives!: string;
  currentCreatureFeatures!: string;
  currentCreatureName!: string;
  currentCreatureNature!: string;
  currentCreatureRank!: string;
  currentCreatureTactics!: string;
  

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);


  
  private testVariable = environment;
   


  //JSON of the natures, and the different creatures per nature as an object
  //natureJSON= require('../JSON Files/specieslists-just_species_and_beasts.json');


    ngOnInit(){
     
      this.bestiarySpeciesList = [];
      for (var key in this.natureJSON){
                this.bestiarySpeciesList[this.currentSpeciesListCount] = key;
                this.currentSpeciesListCount++;
       }
    
      const sub2 = this.httpClient.get(this.testVariable.PORT_VAR)
        .subscribe({
            next: (resp2Data) => {
              this.natureJSON = resp2Data;
               for (var key in resp2Data){
                
                this.bestiarySpeciesList.push(key);
              }              
            }
        });
        this.destroyRef.onDestroy(() => {
          sub2.unsubscribe();
        }); 
    }


    

   displaySublist(species: string){
    const filteredList = this.dummyBeastsList.filter((dbl) => dbl.species === species);
    //console.log("the test value is " + this.testNode);
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
