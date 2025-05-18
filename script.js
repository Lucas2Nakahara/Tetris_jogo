const tetris = document.getElementById("tetris");
    const scoreDisplay = document.getElementById("score");
    const width = 10;
    let squares = [];
    let score = 0;

    for (let i = 0; i < 200; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        tetris.appendChild(square);
        squares.push(square);
    }

    const lTetromino = [
      [1, width + 1, width * 2 + 1, 2],
      [width, width + 1, width + 2, width * 2 + 2],
      [1, width + 1, width * 2 + 1, width * 2],
      [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    let currentPosition = 4;
    let currentRotation = 0;
    let current = lTetromino[currentRotation];

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino");
        });
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("tetromino");
        });
    }

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        addScore(1);
    }

    function addScore(points) {
        score += points;
        scoreDisplay.textContent = score;
        fetch("http://localhost:3000/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score })
        }).catch(() => {});
    }

    draw();
    setInterval(moveDown, 1000);