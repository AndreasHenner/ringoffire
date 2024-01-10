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
import {Firestore, addDoc, collection, doc, onSnapshot, updateDoc, } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

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
    EditPlayerComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore); // Firebase mit Projekt verknüpfen
  game = new Game();
  gameId: string | any;
  unsubList: any;
  gameDoc: any;
  gameOver = false;

  // ActivatedRoute => die URL ist mit der id verknüpft
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

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
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      const gameDocRef = doc(collection(this.firestore, 'games'), this.gameId);
      this.unsubList = onSnapshot(gameDocRef, (gameDoc) => {
        if (gameDoc.exists()) {
          const gameDate = gameDoc.data();
          this.game.currentPlayer = gameDate['currentPlayer'];
          this.game.playedCard = gameDate['playedCard'];
          this.game.players = gameDate['players'];
          this.game.playerImages = gameDate['playerImages'];
          this.game.stack = gameDate['stack'];
          this.game.pickCardAnimation = gameDate['pickCardAnimation'];
          this.game.currentCard = gameDate['currentCard'];
        } else {
          console.log('Game not found');
        }
      });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation && this.game.players.length > 0) {
      this.game.pickCardAnimation = true;
      let currentCard = this.game.stack.pop(); // pop() nimmt immer das letzte Element des Arrays und löscht dieses auch
      if (currentCard != undefined) {
        this.game.currentCard = currentCard;
      }
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length; // Modulu = currentPlayer ist 3 geteilt durch 3 = 0, fängt wieder von vorne an
      this.updateGame();
      setTimeout(() => {
        this.game.playedCard.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame();
      }, 800);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImages.push('profilImg.jpg');
        this.updateGame();
      }
    });
  }

  updateGame() {
    let docRef = doc(collection(this.firestore, 'games'), this.gameId);
    updateDoc(docRef, this.game.toJson());
  }

  editPlayer(i: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(i, 1);
          this.game.playerImages.splice(i, 1);
        } else {
          this.game.playerImages[i] = change;
        } 
        this.updateGame();
      }
    });
  }
}
