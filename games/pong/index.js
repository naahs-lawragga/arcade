(function () {
  window.ArcadeGames = window.ArcadeGames || {};

  window.ArcadeGames.pong = {
    init: function (container) {
      container.innerHTML = '';
      const canvas = document.createElement('canvas');
      canvas.width = 700;
      canvas.height = 400;
      canvas.style.maxWidth = '100%';
      canvas.style.display = 'block';
      canvas.style.margin = '0 auto';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      let animId;
      let gameMode = null; // 'bot' or 'coop'
      let p1Y = 160, p2Y = 160;
      let ballX = 350, ballY = 200, ballVX = 4, ballVY = 2.5;
      let p1Score = 0, p2Score = 0;
      const paddleH = 80, paddleW = 12, speed = 6;
      const keys = {};

      function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballVX = (Math.random() > 0.5 ? 1 : -1) * 4;
        ballVY = (Math.random() * 2 - 1) * 3;
      }

      function handleKeydown(e) { keys[e.code] = true; }
      function handleKeyup(e) { keys[e.code] = false; }

      function handleMenuClick(e) {
        if (gameMode) return;
        const rect = canvas.getBoundingClientRect();
        const clickY = e.clientY - rect.top;

        if (clickY > 180 && clickY < 230) {
          gameMode = 'bot';
          startGame();
        } else if (clickY > 240 && clickY < 290) {
          gameMode = 'coop';
          startGame();
        }
      }

      function drawMenu() {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('SELECT PONG MODE', canvas.width / 2, 120);

        // Bot Button
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(canvas.width / 2 - 120, 180, 240, 45);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('1 Player (vs Bot)', canvas.width / 2, 208);

        // Co-Op Button
        ctx.fillStyle = '#10b981';
        ctx.fillRect(canvas.width / 2 - 120, 240, 240, 45);
        ctx.fillStyle = '#fff';
        ctx.fillText('2 Players (Local Co-Op)', canvas.width / 2, 268);

        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Controls: P1 (W/S) | P2 (Up/Down Arrow)', canvas.width / 2, 340);
        ctx.textAlign = 'left';
      }

      function startGame() {
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);
        resetBall();
        loop();
      }

      function loop() {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // P1 Movement
        if (keys['KeyW']) p1Y = Math.max(0, p1Y - speed);
        if (keys['KeyS']) p1Y = Math.min(canvas.height - paddleH, p1Y + speed);

        // P2 Movement (Bot vs Co-Op)
        if (gameMode === 'coop') {
          if (keys['ArrowUp']) p2Y = Math.max(0, p2Y - speed);
          if (keys['ArrowDown']) p2Y = Math.min(canvas.height - paddleH, p2Y + speed);
        } else {
          const aiCenter = p2Y + paddleH / 2;
          if (aiCenter < ballY - 10) p2Y = Math.min(canvas.height - paddleH, p2Y + speed * 0.7);
          else if (aiCenter > ballY + 10) p2Y = Math.max(0, p2Y - speed * 0.7);
        }

        ballX += ballVX;
        ballY += ballVY;

        if (ballY <= 0 || ballY >= canvas.height) ballVY *= -1;

        if (ballX <= paddleW + 10 && ballY >= p1Y && ballY <= p1Y + paddleH) {
          ballVX = Math.abs(ballVX) * 1.04;
          ballVY += (ballY - (p1Y + paddleH / 2)) * 0.1;
        }
        if (ballX >= canvas.width - paddleW - 10 && ballY >= p2Y && ballY <= p2Y + paddleH) {
          ballVX = -Math.abs(ballVX) * 1.04;
          ballVY += (ballY - (p2Y + paddleH / 2)) * 0.1;
        }

        if (ballX < 0) { p2Score++; resetBall(); }
        if (ballX > canvas.width) { p1Score++; resetBall(); }

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

      canvas.addEventListener('click', handleMenuClick);
      drawMenu();

      return {
        destroy() {
          if (animId) cancelAnimationFrame(animId);
          window.removeEventListener('keydown', handleKeydown);
          window.removeEventListener('keyup', handleKeyup);
          canvas.removeEventListener('click', handleMenuClick);
          container.innerHTML = '';
        }
      };
    }
  };
})();
