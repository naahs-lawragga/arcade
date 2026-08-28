(function () {
  window.ArcadeGames = window.ArcadeGames || {};

  window.ArcadeGames.snake = {
    init: function (container) {
      container.innerHTML = '';
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      canvas.style.display = 'block';
      canvas.style.margin = '0 auto';
      canvas.style.border = '2px solid rgba(139, 92, 246, 0.3)';
      canvas.style.borderRadius = '12px';
      canvas.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.15)';
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

        // Dark Canvas BG
        ctx.fillStyle = '#0b0d19';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        for (let i = 0; i < canvas.width; i += gridSize) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
        }

        // Food (Neon Pink/Magenta)
        ctx.fillStyle = '#ec4899';
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 10;
        ctx.fillRect(food.x * gridSize + 2, food.y * gridSize + 2, gridSize - 4, gridSize - 4);

        // Snake Body (Cyan Glow)
        snake.forEach((part, i) => {
          ctx.fillStyle = i === 0 ? '#38bdf8' : '#0284c7';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = i === 0 ? 12 : 4;
          ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
        });

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`Score: ${score}`, 15, 30);
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
    }
  };
})();
