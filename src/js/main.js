const btn = document.querySelector('#btnStart')
const inputNick = document.querySelector('#nickName')
const screenGame = document.querySelector('.wrapper')
const screenMenu = document.querySelector('.card-start')

function playGame() {
  const playBoard = document.querySelector('.play-board');
  const scoreDisplay = document.querySelector('.score');
  const highScoreDisplay = document.querySelector('.high-score');
  const controls = document.querySelectorAll('.controls i')

  let gameOver = false;
  let foodX, foodY;
  let snakeX = 5, snakeY = 10;
  let velocityX = 0, velocityY = 0;
  let snakeBody = [];
  let score = 0;
  let setIntervalId;
  let playerName = inputNick.value.toLocaleUpperCase();

  let highScore = localStorage.getItem(`${playerName}`) || [];
  highScoreDisplay.textContent = `High Score: ${highScore}`


  const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
  }

  const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert('Game Over! Press OK to replay...');
    location.reload();

  }

  const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
      velocityX = 0
      velocityY = -1
    } else if (e.key === "ArrowDown" && velocityY != -1) {
      velocityX = 0
      velocityY = 1
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
      velocityX = -1
      velocityY = 0
    } else if (e.key === "ArrowRight" && velocityX != -1) {
      velocityX = 1
      velocityY = 0
    }
  }

  controls.forEach(key => {
    key.addEventListener('click', () => changeDirection({ key: key.dataset.key }));
  });

  const initGame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "> </div>`;

    if (snakeX === foodX && snakeY === foodY) {
      changeFoodPosition();
      snakeBody.push([foodX, foodY])
      score++;

      highScore = score >= highScore ? score : highScore;
      localStorage.setItem(`${playerName}`, highScore);
      scoreDisplay.textContent = `Score: ${score}`
      highScoreDisplay.textContent = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]
    snakeX += velocityX
    snakeY += velocityY

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
      htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "> </div>`;
      if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameOver = true
      }
    }

    playBoard.innerHTML = htmlMarkup;

  }

  changeFoodPosition();
  setIntervalId = setInterval(initGame, 100)
  document.addEventListener('keydown', changeDirection);
  screenGame.classList.remove('hide')
  screenMenu.classList.add('hide')
}

(function(w, d, s, u) {
  w.UC2BChat = function(c) { w.UC2BChat._.push(c) }; w.UC2BChat._ = []; w.UC2BChat.url = u;
  var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
  j.async = true; j.src = "https://chat.fonetalk.com.br/livechat/livechat.min.js?_=201903270000";
  h.parentNode.insertBefore(j, h);
  })(window, document, 'script', "https://chat.fonetalk.com.br/livechat");

btn.addEventListener('click', playGame)