import { useEffect } from 'react';
import styles from './Movement.module.scss';

class Guy {
  elem: HTMLDivElement | null;
  speed: number;
  posX: number;
  posY: number;
  moveInterval: NodeJS.Timer | undefined;

  constructor() {
    this.elem = document.querySelector('#guy');
    this.speed = 5;
    this.posX = 0;
    this.posY = 0;

    if (this.elem == null) return;

    this.init();
    this.events();
  }

  init() {
    if (this.elem == null) return;
    this.elem.style.backgroundColor = 'red';
  }

  events() {
    document.addEventListener('keydown', (event) => {
      if (this.moveInterval != undefined) return;
      this.moveInterval = setInterval(() => {
        this.move(event.key);
      }, 50);
    });
    document.addEventListener('keyup', (event) => {
      clearInterval(this.moveInterval);
      this.moveInterval = undefined;
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
}

export function Movement() {
  const start = () => {
    const guy = new Guy();
  };

  useEffect(start, []);
  return (
    <div className={`${styles.container}`}>
      <h1>Welcome to Movement!</h1>
      <div id="guy" className={`${styles.guy}`}></div>
      <button className={`${styles.start}`} onClick={start}>
        Start
      </button>
    </div>
  );
}

export default Movement;
