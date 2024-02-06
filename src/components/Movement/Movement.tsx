import { useEffect, useState } from 'react';
import styles from './Movement.module.scss';
import { hearts } from './hearts';

type Styles = {
  [key: string]: string;
};

type KeyMappings = {
  [key: string]: Arrow;
};

type Arrow = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

type IntervalDirection = 'moveIntervalX' | 'moveIntervalY';

type PositioningCoords = [number, number];

class Guy {
  private elem: HTMLDivElement;
  private keyMappings: KeyMappings;
  private moveIntervalX?: NodeJS.Timeout;
  private moveIntervalY?: NodeJS.Timeout;
  private tickInterval: number = 10;
  private speed: number = 5;
  private posX: number;
  private posY: number;
  private xAxis: Arrow[] = ['ArrowLeft', 'ArrowRight'];
  private yAxis: Arrow[] = ['ArrowUp', 'ArrowDown'];
  private style: Styles = {
    background: 'red',
    display: 'inline-block',
    position: 'absolute',
    width: '50px',
    height: '50px',
  };

  constructor(
    element: string,
    keyMappings?: KeyMappings,
    pos?: PositioningCoords
  ) {
    this.elem = document.querySelector(`#${element}`) as HTMLDivElement;

    this.keyMappings = keyMappings || {
      ArrowUp: 'ArrowUp',
      ArrowDown: 'ArrowDown',
      ArrowLeft: 'ArrowLeft',
      ArrowRight: 'ArrowRight',
    };

    [this.posX, this.posY] = pos || [50, 50];

    this.init();
  }

  private init(): void {
    this.stylize();
    this.eventListeners();
  }

  private stylize(): void {
    this.style = {
      ...this.style,
      left: this.posX + 'px',
      top: this.posY + 'px',
    };
    Object.assign(this.elem.style, this.style);
  }

  private eventListeners(): void {
    document.addEventListener('keydown', (event) => this.handleKeyPress(event));
    document.addEventListener('keyup', (event) => this.handleKeyRelease(event));
  }

  private mapKey(key: string): Arrow {
    return this.keyMappings[key];
  }

  private handleKeyPress(event: KeyboardEvent): void {
    const key = this.mapKey(event.key);
    if (this.xAxis.includes(key)) {
      this.startMovementInterval(key, 'moveIntervalX');
    } else if (this.yAxis.includes(key)) {
      this.startMovementInterval(key, 'moveIntervalY');
    }
  }

  private handleKeyRelease(event: KeyboardEvent): void {
    const key = this.mapKey(event.key);
    if (this.xAxis.includes(key)) {
      this.clearInterval('moveIntervalX');
    } else if (this.yAxis.includes(key)) {
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
  const [typedWord, setTypedWord] = useState('');
  const love = () => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const pressedKey = event.key.toLowerCase();
      const newTypedWord = (typedWord + pressedKey).slice(-4); // Keep only the last 4 characters
      if (newTypedWord === 'love') {
        document.querySelector('#guy1')?.classList.add(`${styles.glow}`);
        hearts();
      }
      setTypedWord(newTypedWord);
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  };

  useEffect(() => love(), [typedWord]);

  useEffect(() => {
    new Guy('guy1', undefined, [100, 100]);
    new Guy('guy2', {
      w: 'ArrowUp',
      s: 'ArrowDown',
      a: 'ArrowLeft',
      d: 'ArrowRight',
    });
  }, []);

  return (
    <>
      <div id="guy1" className="effects-text"></div>
      <div id="guy2"></div>
    </>
  );
}

export default Movement;
