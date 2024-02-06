import { useEffect } from 'react';

interface Styles {
  [key: string]: string;
}

class Guy {
  elem: HTMLDivElement;
  style: Styles;
  tickInterval: number;
  speed: number;
  posX: number;
  posY: number;
  moveIntervalX?: NodeJS.Timeout;
  moveIntervalY?: NodeJS.Timeout;

  constructor() {
    this.elem = document.querySelector('#guy') as HTMLDivElement;
    this.tickInterval = 10;
    this.speed = 5;
    this.posX = 0;
    this.posY = 0;
    this.style = {
      background: 'red',
      display: 'inline-block',
      position: 'absolute',
      width: '50px',
      height: '50px',
      top: '0',
      left: '0',
    };

    this.init();
  }

  private init(): void {
    this.stylize(this.elem, this.style);
    this.eventListeners();
  }

  private stylize(element: HTMLElement, styles: Styles): void {
    Object.assign(element.style, styles);
  }

  private eventListeners(): void {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const { key } = event;
    if (['ArrowLeft', 'ArrowRight'].includes(key)) {
      this.handleMovement(key, 'moveIntervalX');
    } else if (['ArrowUp', 'ArrowDown'].includes(key)) {
      this.handleMovement(key, 'moveIntervalY');
    }
  }

  private handleMovement(
    key: string,
    intervalName: 'moveIntervalX' | 'moveIntervalY'
  ): void {
    if (this[intervalName] !== undefined) return;
    this[intervalName] = setInterval(() => {
      this.move(key);
    }, this.tickInterval);
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const { key } = event;
    if (['ArrowLeft', 'ArrowRight'].includes(key)) {
      this.clearIntervalX();
    } else if (['ArrowUp', 'ArrowDown'].includes(key)) {
      this.clearIntervalY();
    }
  }

  private move(key: string): void {
    switch (key) {
      case 'ArrowRight':
        this.posX += this.speed;
        break;
      case 'ArrowLeft':
        this.posX -= this.speed;
        break;
      case 'ArrowDown':
        this.posY += this.speed;
        break;
      case 'ArrowUp':
        this.posY -= this.speed;
        break;
    }

    this.elem.style.left = this.posX + 'px';
    this.elem.style.top = this.posY + 'px';
  }

  private clearIntervalX(): void {
    clearInterval(this.moveIntervalX);
    this.moveIntervalX = undefined;
  }

  private clearIntervalY(): void {
    clearInterval(this.moveIntervalY);
    this.moveIntervalY = undefined;
  }
}

export function Movement() {
  useEffect(() => {
    new Guy();
  }, []);

  return <div id="guy"></div>;
}

export default Movement;
