import { inject, Injectable } from "@angular/core";
import { BestiaryEntry } from "../bestiary-entry.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";
import { NatureMenuData } from "../nature-menu-data.model";


@Injectable({
    providedIn: 'root',
})
export class TomeOfInfiniteKnowledgeService {
    private httpClient = inject(HttpClient);


    // This is equivalent to /species or /nature endpoint
    // fetches names of natures and the creatures under them.
    // returns natureName -> creatureKey, creatureName
    fetchNatureData(): Observable<NatureMenuData> {
        const natureList$ = this.httpClient.get<NatureMenuData>(environment.NATURE_ENDPOINT)
        return natureList$;
    }

    // This is equivalent to /beast or /creature endpoint
    // TODO: If we stick to observable strategy, this return type will need to change too.
    fetchCreature(creatureName: string) {
        const creatureList$ = this.httpClient.get(environment.CREATURE_ENDPOINT + "/" + creatureName).pipe(
            map(creatureData => {
                let natureJson: any;
                let creatureList: BestiaryEntry[] = [];
                natureJson = creatureData;
                creatureList.push({nature: natureJson.nature, name: natureJson.name, rank: natureJson.rank, featurestraits: natureJson.features, 
                drives: natureJson.drives, tactics: natureJson.tactics, desc: natureJson.description} as BestiaryEntry);
                return creatureList
            }),
        );
        return creatureList$;
    }
}