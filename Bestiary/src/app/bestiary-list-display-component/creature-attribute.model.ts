import { BestiaryEntry } from "../bestiary-entry.model";

export interface CreatureAttribute {
    key: keyof BestiaryEntry,
    name: string,
    displayAsBullets: boolean,
}