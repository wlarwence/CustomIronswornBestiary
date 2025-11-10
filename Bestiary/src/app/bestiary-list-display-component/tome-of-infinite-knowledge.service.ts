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
    fetchCreature(creatureKey: string) {
        const creatureList$ = this.httpClient.get<BestiaryEntry & {features: string[], description: string, tactics: string}>(environment.CREATURE_ENDPOINT + "/" + creatureKey).pipe(
            map(natureJson => {
                const creatureList: BestiaryEntry[] = [];
                creatureList.push({...natureJson, creatureNameKey: creatureKey, featurestraits: natureJson.features, desc: natureJson.description});
                return creatureList
            }),
        );
        return creatureList$;
    }
}