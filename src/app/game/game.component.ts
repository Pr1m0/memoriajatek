import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cards: { url: string, matched: boolean, flipped: boolean }[] = [];
  flippedCards: { index: number, url: string }[] = [];
  allMatched: boolean = false; 

  constructor() { }

  ngOnInit(): void {
    this.initializeCards();
  }

  initializeCards(): void {
    const imageUrls = [
      '/img/lion.jpg',
      '/img/elephant.png',
      '/img/fox.jpg'
    ];

    // Képek megkettőzése
    const duplicatedUrls = [...imageUrls, ...imageUrls];

    // Képek összekeverése
    this.cards = duplicatedUrls
      .map(url => ({ url, matched: false, flipped: false }))
      .sort(() => Math.random() - 0.5);
  }

  flipCard(index: number): void {
    if (this.cards[index].flipped || this.cards[index].matched) {
      return;
    }

    this.cards[index].flipped = true;
    this.flippedCards.push({ index, url: this.cards[index].url });

    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  checkForMatch(): void {
    const [card1, card2] = this.flippedCards;

    if (card1.url === card2.url) {
      this.cards[card1.index].matched = true;
      this.cards[card2.index].matched = true;

      // Kártyák párisításának ellenőrzése
      this.checkForWin();
    } else {
      setTimeout(() => {
        this.cards[card1.index].flipped = false;
        this.cards[card2.index].flipped = false;
      }, 1000);
    }

    this.flippedCards = [];
  }

  checkForWin(): void {
    // Ha a kártyák párosítva vannak, a játékos nyert
    this.allMatched = this.cards.every(card => card.matched);
  }

  restartGame(): void {
    this.cards = []; // Kártyák törlése
    this.flippedCards = []; // Kártyák Törtélse
    this.allMatched = false; // Győzelem törlése
    this.initializeCards(); // Restart
  }
}