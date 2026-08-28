window.GameModule = (function () {
  let container, canvas, ctx, animId;
  let p1Y, p2Y, ballX, ballY, ballVX, ballVY;
  let p1Score = 0, p2Score = 0;
  const paddleH = 80, paddleW = 12, speed = 6;
  const keys = {};

  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballVX = (Math.random() > 0.5 ? 1 : -1) * 5;
    ballVY = (Math.random() * 2 - 1) * 4;
  }

  function handleKeydown(e) { keys[e.code] = true; }
  function handleKeyup(e) { keys[e.code] = false; }

  function loop() {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dotted net
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Player input
    if (keys['ArrowUp'] || keys['KeyW']) p1Y = Math.max(0, p1Y - speed);
    if (keys['ArrowDown'] || keys['KeyS']) p1Y = Math.min(canvas.height - paddleH, p1Y + speed);

    // AI movement
    const aiCenter = p2Y + paddleH / 2;
    if (aiCenter < ballY - 10) p2Y = Math.min(canvas.height - paddleH, p2Y + speed * 0.75);
    else if (aiCenter > ballY + 10) p2Y = Math.max(0, p2Y - speed * 0.75);

    // Physics
    ballX += ballVX;
    ballY += ballVY;

    if (ballY <= 0 || ballY >= canvas.height) ballVY *= -1;

    // Paddle Collisions
    if (ballX <= paddleW + 10 && ballY >= p1Y && ballY <= p1Y + paddleH) {
      ballVX = Math.abs(ballVX) * 1.05;
      ballVY += (ballY - (p1Y + paddleH / 2)) * 0.1;
    }
    if (ballX >= canvas.width - paddleW - 10 && ballY >= p2Y && ballY <= p2Y + paddleH) {
      ballVX = -Math.abs(ballVX) * 1.05;
      ballVY += (ballY - (p2Y + paddleH / 2)) * 0.1;
    }

    // Scoring
    if (ballX < 0) { p2Score++; resetBall(); }
    if (ballX > canvas.width) { p1Score++; resetBall(); }

    // Render elements
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(10, p1Y, paddleW, paddleH);
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(canvas.width - paddleW - 10, p2Y, paddleW, paddleH);

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(p1Score, canvas.width / 4, 50);
    ctx.fillText(p2Score, (3 * canvas.width) / 4, 50);

    animId = requestAnimationFrame(loop);
  }

  return {
    init(host) {
      container = host;
      canvas = document.createElement('canvas');
      canvas.width = 700;
      canvas.height = 400;
      canvas.style.maxWidth = '100%';
      container.appendChild(canvas);
      ctx = canvas.getContext('2d');
      p1Y = p2Y = (canvas.height - paddleH) / 2;
      window.addEventListener('keydown', handleKeydown);
      window.addEventListener('keyup', handleKeyup);
      resetBall();
      loop();
    },
    destroy() {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
      if (container) container.innerHTML = '';
    }
  };
})();
