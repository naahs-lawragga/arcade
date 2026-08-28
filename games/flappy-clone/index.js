(function () {
  window.FlappyCloneGame = function createGame(container) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 500;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let animId;
    let birdY = 200, velocity = 0, pipes = [], score = 0, gameOver = false;
    const gravity = 0.4, jump = -7, pipeGap = 120, pipeWidth = 50;

    function handleInput(e) {
      if (e.type === 'click' || e.code === 'Space') {
        if (gameOver) reset();
        else velocity = jump;
      }
    }

    function reset() {
      birdY = 200;
      velocity = 0;
      pipes = [];
      score = 0;
      gameOver = false;
    }

    function loop() {
      ctx.fillStyle = '#70c5ce';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!gameOver) {
        velocity += gravity;
        birdY += velocity;

        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 180) {
          const topH = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 40;
          pipes.push({ x: canvas.width, top: topH, passed: false });
        }

        pipes.forEach(pipe => {
          pipe.x -= 2;
          if (!pipe.passed && pipe.x < 100) {
            score++;
            pipe.passed = true;
          }

          if (100 + 14 > pipe.x && 100 - 14 < pipe.x + pipeWidth) {
            if (birdY - 14 < pipe.top || birdY + 14 > pipe.top + pipeGap) {
              gameOver = true;
            }
          }
        });

        if (pipes.length > 0 && pipes[0].x + pipeWidth < 0) pipes.shift();
        if (birdY < 0 || birdY > canvas.height) gameOver = true;
      }

      ctx.fillStyle = '#22c55e';
      pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
      });

      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(100, birdY, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(`Score: ${score}`, 20, 40);

      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over! Click to Restart', canvas.width / 2, canvas.height / 2);
        ctx.textAlign = 'left';
      }

      animId = requestAnimationFrame(loop);
    }

    window.addEventListener('keydown', handleInput);
    canvas.addEventListener('click', handleInput);
    loop();

    return {
      destroy() {
        cancelAnimationFrame(animId);
        window.removeEventListener('keydown', handleInput);
        canvas.removeEventListener('click', handleInput);
        container.innerHTML = '';
      }
    };
  };
})();
