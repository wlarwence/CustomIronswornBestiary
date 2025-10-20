import { Component, Output, EventEmitter, OnInit, inject, DestroyRef, signal, DoCheck} from '@angular/core';
import { BestiaryEntry } from '../bestiary-entry.model';
import { CreatureDisplayComponent } from './creature-display-component';
import { trademark } from '../trademark';
import { HttpClient } from '@angular/common/http';
import { TomeOfInfiniteKnowledgeService } from './tome-of-infinite-knowledge.service';
import { NatureMenuData } from '../nature-menu-data.model';
import { KeyValuePipe } from '@angular/common';



@Component({
  selector: 'app-bestiary-list-display-component',
  imports: [CreatureDisplayComponent, KeyValuePipe],
  templateUrl: './bestiary-list-display-component.html',
})


export class BestiaryListDisplayComponent implements OnInit, DoCheck {
  //selectedCreature is the currently selected beast
  selectedCreature!: BestiaryEntry[];

  //The currently selected nature for the menu
  currentSelectedNature!: string;

  //A Boolean to determine if the dropdown should be showing
  isCreatureDropdownVisible = false;

  //A boolean to determine if the creature information is showing
  isCreatureInfoShowing = false;

  
  //natureMenuData holds the natures and all the creatures and is displayed in the menu screen on page load
  natureMenuData!: NatureMenuData;
  

  //A string to hold the trademark logo
  dummyTrademark = trademark;  

  @Output() creatureNameOutput = new EventEmitter(); 
  @Output() isCreatureInfoShowingOutput = new EventEmitter();


  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private tomeOfInfiniteKnowledgeService = inject(TomeOfInfiniteKnowledgeService);



  //Load in the initial list of natures and creatures gathered from the backend
  ngOnInit(){
    this.tomeOfInfiniteKnowledgeService.fetchNatureData().subscribe({
      next: (TOIKNatureMenuData) => {
        this.natureMenuData = TOIKNatureMenuData;
      },
    })

    this.displayCreatureInfo("bear");
     return this.natureMenuData;
  }

  ngDoCheck() {
    
  }

  displayCreatureInfo(creatureName: string){
    if (creatureName != undefined){
      this.tomeOfInfiniteKnowledgeService.fetchCreature(creatureName).subscribe({
      next: (serviceList) => {
        this.selectedCreature = serviceList;
      },
    })
    } 
    this.isCreatureInfoShowing = true;
     return this.selectedCreature;
  }

  displayCreatureDropdown(nature: string){
     if(nature === this.currentSelectedNature){
      this.isCreatureDropdownVisible = !this.isCreatureDropdownVisible;
    }
    if(nature != this.currentSelectedNature){
      this.isCreatureDropdownVisible = true;
    }
    this.currentSelectedNature = nature;
    return this.isCreatureDropdownVisible;
  }

  onClose(){
    this.isCreatureInfoShowing = false;
  }
}
