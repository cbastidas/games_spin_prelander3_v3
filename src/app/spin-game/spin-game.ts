import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Game {
  name: string;
  imageUrl: string;
  text: string;
}

@Component({
  selector: 'app-spin-game',
  standalone: true,
  templateUrl: './spin-game.html',
  styleUrl: './spin-game.scss',
  imports: [CommonModule]
})
export class SpinGame {
  games: Game[] = [
    {
      name: 'Book of Dead',
      imageUrl: 'assets/book-of-dead.png',
      text: 'Yeni bir maceraya hazır mısın? Book of Dead’de bugün %84 şanslısın. Hemen keşfet!'
    },
    {
      name: 'Big Bass Bonanza',
      imageUrl: 'assets/big-bass-bonanza.png',
      text: 'Kanka oltanı hazırla! Big Bass Bonanza’da bugün %80 şansın var. Büyük balık seni bekliyor!'
    },
    {
      name: 'Aviator',
      imageUrl: 'assets/aviator.png',
      text: 'Uçuşa hazır mısın? Aviator’da bugün %86 şansla zirveye çıkabilirsin. Kalkış hemen şimdi!'
    },
    {
      name: 'Sweet Bonanza',
      imageUrl: 'assets/sweet-bonanza.png',
      text: 'Kanka sana tatlı bi sürprizim var. Sweet Bonanza’da bugün %79 şans senin yanında. Şeker gibi bir gün seni bekliyor!'
    },
    {
      name: 'Gates of Olympus',
      imageUrl: 'assets/gates-of-olympus.png',
      text: 'Zeus’un kapıları senin için sonuna kadar açık! Gates of Olympus’ta bugün %83 şans seninle. Hadi gel, tanrıları kıskandıralım.'
    },
    {
      name: 'Sugar Rush',
      imageUrl: 'assets/sugar-rush.png',
      text: 'Şeker fırtınası başlıyor! Sugar Rush’ta bugün %81 şansın var. Rengarenk bir eğlence seni bekliyor.'
    },
    {
      name: 'Coin Strike 2',
      imageUrl: 'assets/coin-strike-2.png',
      text: 'Bugün yıldırım gibi şanslısın! Coin Strike 2’de %85 ihtimalle büyük kazanç seni bekliyor. Şimdi dene!'
    },
    {
      name: '3 Pots Riches',
      imageUrl: 'assets/3-pots-riches.png',
      text: 'Altın avı başladı! 3 Pots Riches’te bugün %78 şans senin yanında.'
    },
    {
      name: 'Super Pink Joker',
      imageUrl: 'assets/super-pink-joker.png',
      text: 'Joker bu kez sana gülüyor. Super Pink Joker’de bugün %82 şansın var! Hadi şansını dene, eğlence başlasın.'
    }
  ];

  animationState = 'rotating-slow';
  allGames = [...this.games, ...this.games]; // para scroll infinito
  animationFrameId: number | null = null; 
  scrollSpeed: number = 12;
  deceleration: number = 0.3;
  stopping: boolean = false;
  isSpinning = false;
  winner: any = null;
  trackTranslateX = 0;
  cardWidth = 160;
  gap = 16;
  intervalId: any;
  pendingWinner: any = null;

  startScroll() {
  const animate = () => {
    if (this.isSpinning) {
      this.trackTranslateX -= this.scrollSpeed;

      const totalWidth = this.games.length * (160 + 10);

      if (Math.abs(this.trackTranslateX) >= totalWidth) {
        this.trackTranslateX = 0;
      }

      // Si estamos en fase de frenado
      if (this.stopping) {
        this.scrollSpeed = Math.max(this.scrollSpeed - this.deceleration, 0);

        // Cuando ya casi se detuvo
        if (this.scrollSpeed === 0) {
          this.isSpinning = false;
          this.stopping = false;

          const winnerIndex = Math.floor(Math.random() * this.games.length);
          this.winner = this.games[winnerIndex];
          return; // 👉 paramos aquí
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  this.animationFrameId = requestAnimationFrame(animate);
}

stopScroll() {
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }
}


  spin() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.winner = null;

    const winnerIndex = Math.floor(Math.random() * this.games.length);
    //this.winner = this.games[winnerIndex];

    this.animationState = 'rotating-fast';

    const itemTotalWidth = this.cardWidth + this.gap; // 160 + 16 = 176
    const targetPositionIndex = 3;
    const offsetCardsInitial = winnerIndex - targetPositionIndex;
    const targetTranslateInitial = -(offsetCardsInitial * itemTotalWidth) + (this.cardWidth / 2);
    const visualOffset = 30; // Tu offset visual
    this.trackTranslateX = targetTranslateInitial + visualOffset; 

    //const alignmentOffset = winnerIndex * itemTotalWidth;
    //let targetTranslate = -(alignmentOffset - (targetPositionIndex * itemTotalWidth));
    //targetTranslate -= (this.cardWidth / 2);

//this.scrollSpeed = 12;
//this.stopping = false;

    // El ganador debe alinearse en el centro (posición 3, índice 3 = cuarta carta)
//    const targetPosition = 3;
//    const offsetCards = winnerIndex - targetPosition;
//    const targetTranslate = -(offsetCards * (this.cardWidth + this.gap))
//                        + (this.cardWidth / 2);

    // Calcular cuántas cartas mover
//    const offsetCards = winnerIndex - targetPosition;

    // Movimiento en píxeles
//    const targetTranslate = -(offsetCards * this.cardWidth);

    // Añadir varias vueltas antes de detenerse
//    const totalTranslate = targetTranslate - (this.cardWidth * this.games.length * 3);

    // Aplicar animación
//    const visualOffset = this.cardWidth / 2; // para que quede centrado visualmente
//    this.trackTranslateX = targetTranslate - (this.cardWidth * this.games.length * 3) + visualOffset;
//    this.startScroll();
    // simulamos animación de spin
    setTimeout(() => {
    this.animationState = 'rotating-stop';

    //const targetPosition = 3; // la carta central
    const offsetCards = winnerIndex - targetPositionIndex;
    //const targetTranslate = -(offsetCards * (this.cardWidth + this.gap));
    let finalStopTranslate = -(offsetCards * itemTotalWidth);
    finalStopTranslate -= (this.cardWidth / 2); // 160 / 2 = -80px
    this.trackTranslateX = finalStopTranslate;

      setTimeout(() => {
      this.animationState = '';
      this.isSpinning = false;
      this.winner = this.games[winnerIndex];
      // Aquí aparece el popup
    }, 500); // duración de la desaceleración
  }, 3000); // tiempo que gira rápido antes de desacelerar
}    

  getWinnerText(name: string): string {
  switch (name) {
    case 'Book of Dead':
      return 'Yeni bir maceraya hazır mısın? Book of Dead’de bugün %84 şanslısın. Hemen keşfet!';
    case 'Big Bass Bonanza':
      return 'Kanka oltanı hazırla! Big Bass Bonanza’da bugün %80 şansın var. Büyük balık seni bekliyor!';
    case 'Aviator':
      return 'Uçuşa hazır mısın? Aviator’da bugün %86 şansla zirveye çıkabilirsin. Kalkış hemen şimdi!';
    case 'Sweet Bonanza':
      return 'Kanka sana tatlı bi sürprizim var. Sweet Bonanza’da bugün %79 şans senin yanında. Şeker gibi bir gün seni bekliyor!';
    case 'Gates of Olympus':
      return 'Zeus’un kapıları senin için sonuna kadar açık! Gates of Olympus’ta bugün %83 şans seninle. Hadi gel, tanrıları kıskandıralım.';
    case 'Sugar Rush':
      return 'Şeker fırtınası başlıyor! Sugar Rush’ta bugün %81 şansın var. Rengarenk bir eğlence seni bekliyor.';
    case 'Coin Strike 2':
      return 'Bugün yıldırım gibi şanslısın! Coin Strike 2’de %85 ihtimalle büyük kazanç seni bekliyor. Şimdi dene!';
    case '3 Pots Riches':
      return 'Altın avı başladı! 3 Pots Riches’te bugün %78 şans senin yanında.';
    case 'Super Pink Joker':
      return 'Joker bu kez sana gülüyor. Super Pink Joker’de bugün %82 şansın var! Hadi şansını dene, eğlence başlasın';
    default:
      return '';
  }
}

}
