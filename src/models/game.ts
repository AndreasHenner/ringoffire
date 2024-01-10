export class Game {
  public players: string[] = [];
  public playerImages: string[] = [];
  public stack: string[] = [];
  public playedCard: string[] = [];
  public currentPlayer: number = 0;
  public pickCardAnimation = false;
  public currentCard: string = '';

  constructor() {
    for (let i = 1; i < 2; i++) {
      this.stack.push('ace_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
      this.stack.push('hearts_' + i);
    }

    shuffle(this.stack);
  }

  public toJson() {
    return {
      players: this.players,
      playerImages: this.playerImages,
      stack: this.stack,
      playedCard: this.playedCard,
      currentPlayer:  this.currentPlayer,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard
    };
  }
}

function shuffle(array: any[]) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex],];}

  return array;
}
