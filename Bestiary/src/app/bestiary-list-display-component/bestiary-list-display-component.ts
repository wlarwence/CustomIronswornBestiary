import { Component, Output, EventEmitter, OnInit, inject, DestroyRef, signal, OnChanges, DoCheck} from '@angular/core';
import { BestiaryEntry } from '../bestiary-entry.model';
import { CreatureDisplayComponent } from './creature-display-component';
import { trademark } from '../trademark';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TomeOfInfiniteKnowledgeService } from './tome-of-infinite-knowledge.service';



@Component({
  selector: 'app-bestiary-list-display-component',
  imports: [CreatureDisplayComponent],
  templateUrl: './bestiary-list-display-component.html',
})


export class BestiaryListDisplayComponent implements OnInit, DoCheck {
 //The screen width and height
  // TODO: remove screenwidth/height, just handle it in CSS @media
  screenHeight!: number;
  screenWidth!: number;

  //creatureList holds all the beast and selecteBeast is the currently selected beast
  creatureList = signal<BestiaryEntry[]>([]);
  selectedBeast! : BestiaryEntry;
 
  //A string array to hold the names of all the natures (species: deprecated)
  natureList = signal<string[]>([]);
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
  private tomeOfInfiniteKnowledgeService = inject(TomeOfInfiniteKnowledgeService);

  //Environment variables used for getting the creature natures, as well as the creature information from the specified URLs
  private natureDevSource= environment;
  private creatureDevSource = environment.CREATURE_ENDPOINT;


  //Holds the name of the creatures currently selected by the user to ensure that they are not checked again
  private checkedCreatureList = ['']; // TODO: write this in a way where this isn't needed

  // An integer to check how many times on init was called
  private initCount = 0; //TODO: remove

  //Checks to see if the current creature was already checked, so the user cannot spam click the same creature multiple times
  private wasCreatureChecked = false; // TODO: see above
 
   
  

  //Load in the initial list of natures and creatures gathered from the backend
  ngOnInit(){
    this.tomeOfInfiniteKnowledgeService.fetchNatureList().subscribe({
      next: (natureList) => {
        this.natureList.set(natureList);
        console.log('value of naturelist in component', this.natureList());
      }
      ,
    })
    // TODO: setup destroy ref
  }

  ngDoCheck() {
    console.log('changed!', this.natureList());
  }

   displayCreatureInfo(creatureName: string){
    // TODO: we should probably replace fetchCreatureList in Tome of Infinite Knowledge with this logic
    this.wasCreatureChecked = false;
    let resultingCreatureList: BestiaryEntry[] = []
    if (this.wasCreatureChecked == false && !this.checkedCreatureList.includes(creatureName)){
       const creatureInfoSubscription = this.httpClient.get(environment.CREATURE_ENDPOINT + creatureName
      ).subscribe({
        next:(respData) => {
          this.creatureJSON = respData;
          // TODO: revisit the type casting
          resultingCreatureList.push({species: this.creatureJSON.nature, name: creatureName, rank: this.creatureJSON.rank, featurestraits: this.creatureJSON.features, 
          drives: this.creatureJSON.drives, tactics: this.creatureJSON.tactics, desc: this.creatureJSON.description} as BestiaryEntry);   
        }
      });
      this.creatureList.set(resultingCreatureList);
    
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
