import { Component, Input } from '@angular/core';
import { BestiaryEntry } from '../bestiary-entry.model';
import { CreatureAttribute } from './creature-attribute.model';

@Component({
  selector: 'app-creature-display-component',
  imports: [],
  templateUrl: './creature-display-component.html',
})
export class CreatureDisplayComponent {
  @Input({required: false}) creatureInfo!: BestiaryEntry;

  public attributeTree: CreatureAttribute[];

  constructor() {
    const attributeTreeRaw: [keyof BestiaryEntry,string,boolean][] = [
      ['nature', 'Nature', false],
      ['rank', 'Rank', false],
      ['featurestraits', 'Traits', true],
      ['drives', 'Drives', true],
      ['tactics', 'Tactics', true],
    ];
    this.attributeTree = attributeTreeRaw.map<CreatureAttribute>(item => {return {key: item[0], name: item[1], displayAsBullets: item[2]};});
  }
}
