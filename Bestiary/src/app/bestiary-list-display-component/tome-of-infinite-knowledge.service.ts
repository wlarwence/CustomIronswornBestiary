import { DestroyRef, inject, Injectable } from "@angular/core";
import { BestiaryEntry } from "../bestiary-entry.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root',
})
export class TomeOfInfiniteKnowledgeService {
    private httpClient = inject(HttpClient);
    private destroyRef = inject(DestroyRef);

    // We're trying to kill dummy beasts. That said, here is dummy beasts
    fetchCreatureList() {
        const bestiarySpeciesList = [];
        const creatureList: BestiaryEntry[] = [];
        let natureJson: any;
        
        const sub2 = this.httpClient.get(environment.PORT_VAR)
            .subscribe({
                next: (resp2Data) => {
                    natureJson = resp2Data;
                    for (var natureKey in resp2Data){
                        bestiarySpeciesList.push(natureKey);
                        for(var [creatureKey, creatureName] of Object.entries(natureJson[natureKey])){
                        creatureList.push({species: natureKey, name: creatureKey, rank: "", featurestraits: [], 
                        drives: [], tactics: [], desc: ""} as BestiaryEntry);
                        }  
                    }
                    // TODO: remove this
                    console.log(creatureList);
                    
                },
                error: (error) => console.error(error),
        });
        this.destroyRef.onDestroy(() => {
            sub2.unsubscribe();
        });

        return creatureList;
    }

    // This is equivalent to /species or /nature endpoint
    // natureName -> creatureKey, creatureName
    fetchNatureData(): Map<string, Map<string, string>> {
        return new Map<string, Map<string,string>>();
    }

    // This is equivalent to /beast or /creature endpoint
    fetchCreature(): BestiaryEntry {
        return {} as BestiaryEntry;
    }
}