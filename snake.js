document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const width = 20;
    const height = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let movexaxis = 0;
    let moveyaxis = 0;
    let intervalId;

    const isSnake =(x, y) => { return snake.some((segment) => segment.x === x && segment.y === y);}

    const drawGameBoard = () => {
        board.innerHTML = '';
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cell = document.createElement('div');

                cell.classList.add('cell');
                if (isSnake(x, y)) {
                    cell.classList.add('snake');
                } else if (x === food.x && y === food.y) {
                    cell.classList.add('food');
                }
                board.appendChild(cell);
            }
        }
    }

    function moveSnake() {
        const head = { x: snake[0].x + movexaxis, y: snake[0].y + moveyaxis };

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food.x = Math.floor(Math.random() * width);
            food.y = Math.floor(Math.random() * height);
        } else {
            snake.pop();
        }
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (moveyaxis !== 1) { movexaxis = 0; moveyaxis = -1; }
                break;
            case 'ArrowDown':
                if (moveyaxis !== -1) { movexaxis = 0; moveyaxis = 1; }
                break;
            case 'ArrowLeft':
                if (movexaxis !== 1) { movexaxis = -1; moveyaxis = 0; }
                break;
            case 'ArrowRight':
                if (movexaxis !== -1) { movexaxis = 1; moveyaxis = 0; }
                break;
        }
    }

    function checkCollision() {
        const head = snake[0];

        return (
            head.x < 0 || head.x >= width ||
            head.y < 0 || head.y >= height ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        );
    }

    function startGame() {
        intervalId = setInterval(() => {
            if (checkCollision()) {
                clearInterval(intervalId);
                alert('Game Over!');
                return;
            }
            moveSnake();
            drawGameBoard();
        }, 200);
    }

    document.addEventListener('keydown', handleKeyPress);
    startGame();
});
