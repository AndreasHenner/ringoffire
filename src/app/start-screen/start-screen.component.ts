import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})

export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

   //start game
  newGame() {
    let game = new Game();
    addDoc(collection(this.firestore, 'games'), game.toJson(),).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}
