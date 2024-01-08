import { Component, inject } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { NgStyle } from '@angular/common';
import { NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, addDoc, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    DialogAddPlayerComponent,
    GameInfoComponent,
    NgClass,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore); // Firebase mit Projekt verknüpfen
  pickCardAnimation = false;
  currentCard: string = '';
  game = new Game();
  unsubList: any;

   // ActivatedRoute => die URL ist mit der id verknüpft
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngonDestroy() {
    this.unsubList();
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDoc(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
  
  ngOnInit(): void {
    //this.newGame();
    this.route.params.subscribe((params) => {
      const gameId = params['id'];
      console.log(gameId);
      const gameDocRef = doc(collection(this.firestore, 'games'), gameId);
      this.unsubList = onSnapshot(gameDocRef, (gameDoc) => {
        if (gameDoc.exists()) {
          const gameDate = gameDoc.data();
          console.log('game update:', gameDoc.data());
          this.game.currentPlayer = gameDate['game']['currentPlayer'];
          this.game.playedCard = gameDate['game']['playedCard'];
          this.game.players = gameDate['game']['players'];
          this.game.stack = gameDate['game']['stack'];
        } else {
          console.log('Game not found');
        }
      });
    });
  }


  newGame() {
    this.game = new Game();
    console.log("current game:", this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.players.length > 0) {
      this.pickCardAnimation = true;
      let currentCard = this.game.stack.pop(); // pop() nimmt immer das letzte Element des Arrays und löscht dieses auch
      if (currentCard != undefined) {
        this.currentCard = currentCard;
      }
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // Modulu = currentPlayer ist 3 geteilt durch 3 = 0, fängt wieder von vorne an
      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 800);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
 
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
