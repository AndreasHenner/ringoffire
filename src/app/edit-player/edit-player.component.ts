import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [NgForOf, MatDialogModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})

export class EditPlayerComponent {

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {

  }

  allProfilePictures = ['boy.jpg', 'businessMen.jpg', 'cartoonMouse.jpg', 'chinese.png', 'profilImg.png', 'redhair.jpg', 'white.jpg'];

}
