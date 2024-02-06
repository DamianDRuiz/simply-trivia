import { useEffect } from 'react';

class Guy {
  elem: HTMLDivElement | null;
  style;
  speed: number;
  posX: number;
  posY: number;
  moveIntervalX: NodeJS.Timer | undefined;
  moveIntervalY: NodeJS.Timer | undefined;

  constructor() {
    this.elem = document.querySelector('#guy');
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

    if (this.elem == null) return;

    this.init();
  }

  init() {
    if (this.elem == null) return;
    this.stylize(this.elem, this.style);
    this.eventListeners();
  }

  stylize(e: HTMLDivElement, styles: Styles) {
    for (const property in styles) e.style[property as any] = styles[property];
  }

  eventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key == 'ArrowLeft' || event.key == 'ArrowRight') {
        if (this.moveIntervalX != undefined) return;
        this.moveIntervalX = setInterval(() => {
          this.move(event.key);
        }, 50);
      } else if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
        if (this.moveIntervalY != undefined) return;
        this.moveIntervalY = setInterval(() => {
          this.move(event.key);
        }, 50);
      }
    });

    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowLeft':
          this.clearIntervalX();
          break;
        case 'ArrowDown':
        case 'ArrowUp':
          this.clearIntervalY();
          break;
      }
    });
  }

  move(key: string) {
    if (this.elem == null) return;

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

  clearIntervalX() {
    clearInterval(this.moveIntervalX);
    this.moveIntervalX = undefined;
  }

  clearIntervalY() {
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

type Styles = {
  [key: string]: string;
};

export default Movement;
