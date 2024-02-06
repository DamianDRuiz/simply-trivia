import { useEffect } from 'react';

type Styles = {
  [key: string]: string;
};

type KeyMappings = { [key: string]: string };

type IntervalDirection = 'moveIntervalX' | 'moveIntervalY';

class Guy {
  private elem: HTMLDivElement;
  private readonly style: Styles;
  private readonly tickInterval: number;
  private readonly speed: number;
  private posX: number;
  private posY: number;
  private moveIntervalX?: NodeJS.Timeout;
  private moveIntervalY?: NodeJS.Timeout;
  private readonly keyMappings: KeyMappings;

  constructor(element: string, keyMapping?: KeyMappings) {
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
    this.keyMappings = keyMapping || {
      ArrowUp: 'ArrowUp',
      ArrowDown: 'ArrowDown',
      ArrowLeft: 'ArrowLeft',
      ArrowRight: 'ArrowRight',
    };

    this.init();
  }

  private init(): void {
    this.stylize();
    this.eventListeners();
  }

  private stylize(): void {
    Object.assign(this.elem.style, this.style);
  }

  private eventListeners(): void {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
    document.addEventListener('keyup', this.handleKeyRelease.bind(this));
  }

  private mapKey(key: string): string {
    return this.keyMappings[key];
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
      this.clearInterval('moveIntervalX');
    } else if (['ArrowUp', 'ArrowDown'].includes(key)) {
      this.clearInterval('moveIntervalY');
    }
  }

  private startMovementInterval(
    key: string,
    intervalName: IntervalDirection
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

  private clearInterval(interval: IntervalDirection): void {
    clearInterval(this[interval]);
    this[interval] = undefined;
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
