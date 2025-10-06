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
  lastWinnerIndex: number = -1;

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

private getCardWidth(): number {
    if (window.innerWidth <= 280) {
      return 80; // ancho de card en mobile según tu CSS
    }
    return 160; // ancho de card en desktop
  }

  private getGap(): number {
    if (window.innerWidth <= 280) {
      return 16; // gap reducido en mobile (por el margin: 0 5px)
    }
    return 16; // gap en desktop
  }

   private checkDimensionsChanged(): boolean {
    const currentWidth = this.getCardWidth();
    const currentGap = this.getGap();
    return this.cardWidth !== currentWidth || this.gap !== currentGap;
  }

    ngOnInit(): void {
      window.addEventListener('resize', this.recenterWinner);
    }
    recenterWinner = () => {
      if (!this.winner) return;

      const winnerIndex = this.allGames.findIndex(game => game.name === this.winner?.name);

      const container = document.querySelector('.cards-wrapper') as HTMLElement;
      const card = document.querySelector('.card') as HTMLElement;

      if (container && card && winnerIndex !== -1) {
        const containerWidth = container.offsetWidth;
        const cardWidth = card.offsetWidth;
      
        const centerOffset = (containerWidth / 2) - (cardWidth / 2);
      
        this.trackTranslateX = -winnerIndex * cardWidth + centerOffset;
      }
    }

    ngOnDestroy(): void {
      window.removeEventListener('resize', this.recenterWinner);
    }


   spin() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.winner = null;

    const winnerIndex = Math.floor(Math.random() * this.games.length);
    this.lastWinnerIndex = winnerIndex; // Guardar el índice

    // DEBUG: Imprimir información
    console.log('=== DEBUG SPIN ===');
    console.log('Winner Index:', winnerIndex);
    console.log('Winner Game:', this.games[winnerIndex].name);
    console.log('Card Width:', this.getCardWidth());
    console.log('Gap:', this.getGap());
    console.log('Window Width:', window.innerWidth);
    console.log('Is Mobile:', window.innerWidth <= 480);

    this.animationState = 'rotating-fast';

    // Actualizar las dimensiones almacenadas
    this.cardWidth = this.getCardWidth();
    this.gap = this.getGap();
    
    const itemTotalWidth = this.cardWidth + this.gap;
    
    // Obtener el ancho real del contenedor
    const containerElement = document.querySelector('.cards-wrapper');
    const container = document.querySelector('.cards-wrapper') as HTMLElement;
    const card = document.querySelector('.card') as HTMLElement;    
    //const containerWidth = containerElement ? containerElement.clientWidth : 1010;
    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;
    const centerOffset = (containerWidth / 2) - (cardWidth / 2);
    
    // La línea verde está en el centro del contenedor
    const linePosition = containerWidth / 2;
    
    // Calcular la posición donde debe quedar el centro de la carta ganadora
    const targetCardCenter = (winnerIndex * itemTotalWidth) + (this.cardWidth / 2);
    
    // Ajuste adicional para mobile
    //const mobileOffset = window.innerWidth <= 480 ? this.gap + 8 : 0;
    
    let targetTranslate = linePosition - targetCardCenter;
    
    this.trackTranslateX = -winnerIndex * cardWidth + centerOffset;

    setTimeout(() => {
      this.animationState = 'rotating-stop';
      
      // Recalcular con las dimensiones actuales por si cambió el viewport
      const currentCardWidth = this.getCardWidth();
      const currentGap = this.getGap();
      const currentItemWidth = currentCardWidth + currentGap;
      const currentContainer = document.querySelector('.cards-wrapper');
      const currentContainerWidth = currentContainer ? currentContainer.clientWidth : 1010;
      const currentLinePosition = currentContainerWidth / 2;
      //const currentMobileOffset = window.innerWidth <= 480 ? currentGap + 12 : 0;
      
      const finalCardCenter = (winnerIndex * currentItemWidth) + (currentCardWidth / 2);
      let finalStopTranslate = currentLinePosition - finalCardCenter;
      
      this.trackTranslateX = finalStopTranslate;

      setTimeout(() => {
        this.animationState = '';
        this.isSpinning = false;
        console.log('=== FINAL POSITION ===');
        console.log('Final Translate X:', this.trackTranslateX);
        console.log('Winner shown:', this.games[winnerIndex].name);
        this.winner = this.games[winnerIndex];
        
        // Actualizar dimensiones finales
        this.cardWidth = currentCardWidth;
        this.gap = currentGap;
      }, 500);
    }, 3000);
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
