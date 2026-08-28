(function () {
  window.SnakeGame = function createGame(container) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const tileCount = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let dx = 1, dy = 0, score = 0, timer;

    function placeFood() {
      food.x = Math.floor(Math.random() * tileCount);
      food.y = Math.floor(Math.random() * tileCount);
    }

    function handleKeydown(e) {
      if (e.code === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
      if (e.code === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
      if (e.code === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
      if (e.code === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
    }

    function step() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
          snake.some(s => s.x === head.x && s.y === head.y)) {
        snake = [{ x: 10, y: 10 }];
        dx = 1; dy = 0; score = 0;
        placeFood();
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        placeFood();
      } else {
        snake.pop();
      }

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ef4444';
      ctx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);

      snake.forEach((part, i) => {
        ctx.fillStyle = i === 0 ? '#4ade80' : '#22c55e';
        ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });

      ctx.fillStyle = '#fff';
      ctx.font = '16px monospace';
      ctx.fillText(`Score: ${score}`, 10, 25);
    }

    placeFood();
    window.addEventListener('keydown', handleKeydown);
    timer = setInterval(step, 100);

    return {
      destroy() {
        clearInterval(timer);
        window.removeEventListener('keydown', handleKeydown);
        container.innerHTML = '';
      }
    };
  };
})();
