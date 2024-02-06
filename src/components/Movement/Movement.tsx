import { useEffect } from 'react';

type Styles = {
  [key: string]: string;
};

type KeyMapping = { [key: string]: string };

class Guy {
  elem: HTMLDivElement;
  style: Styles;
  tickInterval: number;
  speed: number;
  posX: number;
  posY: number;
  moveIntervalX?: NodeJS.Timeout;
  moveIntervalY?: NodeJS.Timeout;
  keyMapping: KeyMapping;

  constructor(element: string, keyMapping?: KeyMapping) {
    this.elem = document.querySelector(`#${element}`) as HTMLDivElement;
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
    this.keyMapping = keyMapping || {
      ArrowUp: 'ArrowUp',
      ArrowDown: 'ArrowDown',
      ArrowLeft: 'ArrowLeft',
      ArrowRight: 'ArrowRight',
    };

    this.init();
  }

  private init(): void {
    this.stylize(this.elem, this.style);
    this.eventListeners();
  }

  private eventListeners(): void {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
    document.addEventListener('keyup', this.handleKeyRelease.bind(this));
  }

  private stylize(element: HTMLElement, styles: Styles): void {
    Object.assign(element.style, styles);
  }

  private mapKey(key: string): string {
    return this.keyMapping[key];
  }

  private handleKeyPress(event: KeyboardEvent): void {
    const key = this.mapKey(event.key);
    if (['ArrowLeft', 'ArrowRight'].includes(key)) {
      this.startMovementInterval(key, 'moveIntervalX');
    } else if (['ArrowUp', 'ArrowDown'].includes(key)) {
      this.startMovementInterval(key, 'moveIntervalY');
    }
  }

  private handleKeyRelease(event: KeyboardEvent): void {
    const key = this.mapKey(event.key);
    if (['ArrowLeft', 'ArrowRight'].includes(key)) {
      this.clearXInterval();
    } else if (['ArrowUp', 'ArrowDown'].includes(key)) {
      this.clearYInterval();
    }
  }

  private startMovementInterval(
    key: string,
    intervalName: 'moveIntervalX' | 'moveIntervalY'
  ): void {
    if (this[intervalName] !== undefined) return;
    this[intervalName] = setInterval(() => {
      this.updatePosition(key);
    }, this.tickInterval);
  }

  private updatePosition(key: string): void {
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

  private clearXInterval(): void {
    clearInterval(this.moveIntervalX);
    this.moveIntervalX = undefined;
  }

  private clearYInterval(): void {
    clearInterval(this.moveIntervalY);
    this.moveIntervalY = undefined;
  }
}

export function Movement() {
  useEffect(() => {
    new Guy('guy1');
    new Guy('guy2', {
      w: 'ArrowUp',
      s: 'ArrowDown',
      a: 'ArrowLeft',
      d: 'ArrowRight',
    });
  }, []);

  return (
    <>
      <div id="guy1"></div>
      <div id="guy2"></div>
    </>
  );
}

export default Movement;
