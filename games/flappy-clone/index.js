window.GameModule = (function () {
  let container, canvas, ctx, animId;
  let birdY, velocity, pipes, score, gameOver;
  const gravity = 0.4, jump = -7, pipeGap = 120, pipeWidth = 50;

  function handleInput(e) {
    if (e.code === 'Space' || e.type === 'click') {
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
        if (pipe.x + pipeWidth < 0) pipes.shift();

        // Collision detection
        if (100 + 20 > pipe.x && 100 - 20 < pipe.x + pipeWidth) {
          if (birdY - 12 < pipe.top || birdY + 12 > pipe.top + pipeGap) {
            gameOver = true;
          }
        }
      });

      if (birdY < 0 || birdY > canvas.height) gameOver = true;
    }

    // Render Pipes
    ctx.fillStyle = '#22c55e';
    pipes.forEach(pipe => {
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
      ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
    });

    // Render Bird
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(100, birdY, 14, 0, Math.PI * 2);
    ctx.fill();

    // Render Score & Overlay
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`Score: ${score}`, 20, 40);

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over! Press Space or Click', canvas.width / 2, canvas.height / 2);
      ctx.textAlign = 'left';
    }

    animId = requestAnimationFrame(loop);
  }

  return {
    init(host) {
      container = host;
      canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 500;
      container.appendChild(canvas);
      ctx = canvas.getContext('2d');
      reset();
      window.addEventListener('keydown', handleInput);
      canvas.addEventListener('click', handleInput);
      loop();
    },
    destroy() {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleInput);
      if (canvas) canvas.removeEventListener('click', handleInput);
      if (container) container.innerHTML = '';
    }
  };
})();
