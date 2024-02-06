export function hearts() {
  // Get random number between 2 ranges
  function randomNum(m: number | string, n: number | string) {
    m = parseInt(m as string);
    n = parseInt(n as string);
    return Math.floor(Math.random() * (n - m + 1)) + m;
  }

  function heartAnimation() {
    var target: HTMLDivElement | null = document.querySelector('.effects-text');
    if (target == null) return;
    var heartCount = (target.offsetWidth / 50) * 5;
    for (var i = 0; i < heartCount; i++) {
      var heartSize = randomNum(60, 120) / 10;
      var tinyHeart = document.createElement('span');
      tinyHeart.classList.add('tiny-heart');
      tinyHeart.style.top = randomNum(40, 80) + '%';
      tinyHeart.style.left = randomNum(0, 100) + '%';
      tinyHeart.style.width = heartSize + 'px';
      tinyHeart.style.height = heartSize + 'px';
      tinyHeart.style.animationDelay = '-' + randomNum(0, 3) + 's';
      tinyHeart.style.animationDuration = randomNum(2, 5) + 's';
      target.appendChild(tinyHeart);
    }
  }

  heartAnimation();
}
