import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})


export class StartScreenComponent {

constructor(private route: ActivatedRoute, private router: Router) { }
  


newGame() {
  //start game
  
  this.router.navigateByUrl('/game/:id');
  }
}

