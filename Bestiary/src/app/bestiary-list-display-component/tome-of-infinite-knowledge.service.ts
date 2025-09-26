import { inject, Injectable } from "@angular/core";
import { BestiaryEntry } from "../bestiary-entry.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class TomeOfInfiniteKnowledgeService {
    private httpClient = inject(HttpClient);

    // We're trying to kill dummy beasts. That said, here is dummy beasts
    // TODO: this currently returns unpopulated bestiary entries. Replace with logic from bestiary-list-display-component
    fetchCreatureList() {
        const creatureList$ = this.httpClient.get(environment.NATURE_ENDPOINT).pipe(
            map(resp2Data => {
                let bestiarySpeciesList = [];
                let natureJson: any;
                let creatureList: BestiaryEntry[] = [];
                natureJson = resp2Data;
                for (var natureKey in resp2Data){
                    bestiarySpeciesList.push(natureKey);
                    for(var [creatureKey, creatureName] of Object.entries(natureJson[natureKey])){
                    creatureList.push({species: natureKey, name: creatureKey, rank: "", featurestraits: [], 
                    drives: [], tactics: [], desc: ""} as BestiaryEntry);
                    }  
                }
                return creatureList
            }),
        );
        return creatureList$;
    }

    // We want to get rid of this, because I want fetchNatureData, which has the map.
    fetchNatureList(): Observable<string[]> {
        const natureList$ = this.httpClient.get(environment.NATURE_ENDPOINT).pipe(
            map(resp2Data => {
                let natureList: string[] = [];
                let natureJson: any;
                let creatureList: BestiaryEntry[] = [];
                natureJson = resp2Data;
                for (var natureKey in resp2Data){
                    natureList.push(natureKey);
                    for(var [creatureKey, creatureName] of Object.entries(natureJson[natureKey])){
                    creatureList.push({species: natureKey, name: creatureKey, rank: "", featurestraits: [], 
                    drives: [], tactics: [], desc: ""} as BestiaryEntry);
                    }  
                }
                return natureList
            }),
        );
        return natureList$;
    }

    // This is equivalent to /species or /nature endpoint
    // fetches names of natures and the creatures under them.
    // returns natureName -> creatureKey, creatureName
    // TODO: If we stick to observable strategy, this return type will need to change too.
    // TODO: resist temptation to call CREATURE_ENDPOINT to populate the inner map.
    fetchNatureData(): Observable<Map<string, Map<string, string>>> {
        return new Observable<Map<string, Map<string, string>>>();
    }

    // This is equivalent to /beast or /creature endpoint
    // TODO: If we stick to observable strategy, this return type will need to change too.
    fetchCreature(): BestiaryEntry {
        return {} as BestiaryEntry;
    }
}