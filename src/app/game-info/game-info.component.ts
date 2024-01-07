import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    {title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player',},
    {title: 'You', description: 'You decide who drinks' },
    {title: 'Me', description: 'Congrats! Drink a shot' },
    {title: 'Catergory', description: 'Come up wtih a category (e.g. Colors). Each Player must enumerate one item dfrom the catagory.',},
    {title: 'Bust a jive', description: 'Player 1 makes a dance-move. Player 2 repeats the dance move and adds a second one',},
    {title: 'Chicks', description: 'All girls drink' },
    {title: 'Heaven', description: 'Put your hands up! The last player drinks!',},
    {title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way round',},
    {title: 'Thumbmaster', description: 'When you put your thumb on the table everyone must follow and whomever is last must drink. You are the thumb master till someone else picks a five.' },
    {title: 'Men', description: 'All men drink' },
    {title: 'Rhyme', description: 'Pick a word such as fog and the person next to you must rhyme with fog, like dog, and it goes to the next person and the next, in a circle, until someone messes up and he or she will have to drink!' },
    {title: 'Never have i never...', description: 'Say something you never did. Everyone who did it has to drink',},
    {title: 'Rule', description: 'Make a rule! Everyone needs to drink when he breaks the rule',}
  ];

  title = '';
  description = '';
  @Input() card: string | undefined;

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (this.card) {
    let cardNumber = +this.card.split('_')[1];
    this.title = this.cardAction[cardNumber - 1].title;
    this.description = this.cardAction[cardNumber - 1].description;
  }
}
}
