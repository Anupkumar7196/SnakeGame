       const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score');
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;
        let snake = [{
            x: 10,
            y: 10
        }];
        let dx = 0;
        let dy = 0;
        let food = {
            x: 15,
            y: 15
        };
        let score = 0;

        function gameLoop() {
            if (isGameOver()) {
                alert('Game Over! Press OK to restart.');
                resetGame();
                return;
            }

            clearCanvas();
            moveSnake();
            drawSnake();
            drawFood();

            if (hasEatenFood()) {
                growSnake();
                moveFood();
                updateScore();
            }

            setTimeout(gameLoop, 250);
        }

        function clearCanvas() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function drawSnake() {
            ctx.fillStyle = 'white';
            snake.forEach(part => {
                ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
            });
        }

        function moveSnake() {
            const head = {
                x: snake[0].x + dx,
                y: snake[0].y + dy
            };
            snake.unshift(head);
            snake.pop();
        }

        function drawFood() {
            ctx.fillStyle = 'green';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        }

        function hasEatenFood() {
            return snake[0].x === food.x && snake[0].y === food.y;
        }

        function growSnake() {
            snake.push({});
        }

        function moveFood() {
            food.x = Math.floor(Math.random() * tileCount);
            food.y = Math.floor(Math.random() * tileCount);
        }

        function updateScore() {
            score += 10;
            scoreDisplay.textContent = score;
        }

        function isGameOver() {
            for (let i = 4; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    return true;
                }
            }

            const hitLeftWall = snake[0].x < 0;
            const hitRightWall = snake[0].x >= tileCount;
            const hitTopWall = snake[0].y < 0;
            const hitBottomWall = snake[0].y >= tileCount;

            return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
        }

        function resetGame() {
            snake = [{
                x: 10,
                y: 10
            }];
            dx = 0;
            dy = 0;
            food = {
                x: 10,
                y: 10
            };
            score = 0;
            scoreDisplay.textContent = score;
            gameLoop();
        }

        document.addEventListener('keydown', changeDirection);

        function changeDirection(event) {
            const LEFT_KEY = 37;
            const RIGHT_KEY = 39;
            const UP_KEY = 38;
            const DOWN_KEY = 40;

            const keyPressed = event.keyCode;

            const goingUp = dy === -1;
            const goingDown = dy === 1;
            const goingRight = dx === 1;
            const goingLeft = dx === -1;

            if (keyPressed === LEFT_KEY && !goingRight) {
                dx = -1;
                dy = 0;
            }

            if (keyPressed === UP_KEY && !goingDown) {
                dx = 0;
                dy = -1;
            }

            if (keyPressed === RIGHT_KEY && !goingLeft) {
                dx = 1;
                dy = 0;
            }

            if (keyPressed === DOWN_KEY && !goingUp) {
                dx = 0;
                dy = 1;
            }
        }

        gameLoop();