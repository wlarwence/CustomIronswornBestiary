import { Component, Output, EventEmitter, OnInit, inject, DestroyRef} from '@angular/core';
import { dummyBeasts } from '../dummy-beasts';
import { BestiaryEntry } from '../bestiary-entry.model';
import { CreatureDisplayComponent } from './creature-display-component';
import { trademark } from '../trademark';
import { HttpClient } from '@angular/common/http';
import { CREATURE_URL_SOURCE, environment } from '../../environments/environment';



@Component({
  selector: 'app-bestiary-list-display-component',
  imports: [CreatureDisplayComponent],
  templateUrl: './bestiary-list-display-component.html',
})


export class BestiaryListDisplayComponent implements OnInit {
 //The screen width and height
  // TODO: remove screenwidth/height, just handle it in CSS @media
  screenHeight!: number;
  screenWidth!: number;

  //Beasts holds all the beast and selecteBeast is the currently selected beast
  Beasts = dummyBeasts;
  selectedBeast! : BestiaryEntry;
 
  //A string array to hold the names of all the natures (species: deprecated)
  bestiarySpeciesList!: string[];
  dummyTrademark = trademark;

  //Variable to determine if the creature info window is open
  isCreatureInfoWindowOpen = false;

  //Which nature (species: deprecated) is currently selected
  currentSpecies = "";

  //which creature is currently selected
  displayCreatureName = "";
  

  //A variable to determine if the sublist of creatures is currently being shown
  isShowingCreatureSublist = false;
  

  @Output() creatureNameOutput = new EventEmitter(); 
  @Output() isCreatureInfoShowingOutput = new EventEmitter();




  //The JSON for the creature info+ the variables to hold the current creature info
  creatureJSON!: any;
  natureJSON!: any;
  
  

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  //Environment variables used for getting the creature natures, as well as the creature information from the specified URLs
  private natureDevSource= environment;
  private creatureDevSource = CREATURE_URL_SOURCE;


  //Holds the name of the creatures currently selected by the user to ensure that they are not checked again
  private checkedCreatureList = ['']; // TODO: write this in a way where this isn't needed

  // An integer to check how many times on init was called
  private initCount = 0; //TODO: remove

  //Checks to see if the current creature was already checked, so the user cannot spam click the same creature multiple times
  private wasCreatureChecked = false; // TODO: see above
 
   
  

  //Load in the initial list of natures and creatures gathered from the backend
    ngOnInit(){
     //An Array to hold the  list of natures (species: deprecated)
      this.bestiarySpeciesList = [];
        
      const sub2 = this.httpClient.get(this.natureDevSource.PORT_VAR)
        .subscribe({
            next: (resp2Data) => {
              this.natureJSON = resp2Data;
               for (var natureKey in resp2Data){
                this.bestiarySpeciesList.push(natureKey);
                for(var [creatureKey, creatureName] of Object.entries(this.natureJSON[natureKey])){
                  if(this.initCount < 1){
                  dummyBeasts.push({species: natureKey, name: creatureKey, rank: "", featurestraits: [], 
                  drives: [], tactics: [], desc: ""});
                  
                  }
                }  
              } 
              
           }
       });
       this.initCount++;
        this.destroyRef.onDestroy(() => {
        sub2.unsubscribe();
      }); 
    }

   displayCreatureInfo(creatureName: string){
    this.wasCreatureChecked = false;
    if (this.wasCreatureChecked == false && !this.checkedCreatureList.includes(creatureName)){
       const creatureInfoSubscription = this.httpClient.get(this.creatureDevSource.CREATURE_PORT_VAR + creatureName)
    .subscribe({
      next:(respData) => {
        this.creatureJSON = respData;
        this.Beasts.push({species: this.creatureJSON.nature, name: creatureName, rank: this.creatureJSON.rank, featurestraits: this.creatureJSON.features, 
        drives: this.creatureJSON.drives, tactics: this.creatureJSON.tactics, desc: this.creatureJSON.description});   
      }
    });
    
      this.destroyRef.onDestroy(() => {
      creatureInfoSubscription.unsubscribe();
      });
    this.wasCreatureChecked = true;
    this.checkedCreatureList.push(creatureName);
    }
   

    this.isCreatureInfoWindowOpen = true;
    this.displayCreatureName = creatureName;

    
    return creatureName;
   }

   
   isCreatureInfoShowing(){
    return true;
   }


   onReturn(){
    this.isCreatureInfoWindowOpen = false;
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
