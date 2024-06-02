function startGame() {
    let btnsLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        btnsLettersArr = Array.from(btnsLetters),
        words = [
            "EGYPT",
            "IRAQ",
            "SYRIA",
            "PALESTINE",
            "LIBIA",
            "LIBNAN",
            "QATAR",
            "KUWAIT",
            "MOROCCO",
            "ALGERIA",
            "SAUDIA",
            "EMIRATES",
            "JORDAN",
            "YAMEN",
            "OMAN",
            "BAHRAIN"
        ];
    let letterContainer = document.querySelector(".letters-cont"),
        wrongAttembs = 0,
        trueAttembs = 0,
        randomIndex = Math.floor(Math.random() * words.length),
        randomWord = words[randomIndex],
        randomWordletters = randomWord.split(""),
        result = document.querySelector(".result");

    btnsLettersArr.forEach((letter) => {
        let htmlLetter = document.createElement("div");
        htmlLetter.classList.add("btn");
        htmlLetter.innerHTML = letter;

        letterContainer.appendChild(htmlLetter);
    });

    randomWordletters.forEach(() => {
        let letSpan = document.createElement("span");
        result.appendChild(letSpan);
    });

    let btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let btnValue = btn.innerHTML;

            let status = false;

            randomWordletters.forEach((letter, wordIndex) => {
                if (btnValue == letter) {
                    status = true;
                    let letterSpans = document.querySelectorAll(".result span");

                    letterSpans.forEach((span, spanIndex) => {
                        if (wordIndex == spanIndex) {
                            span.innerHTML = btnValue;
                            trueAttembs++;
                            if (trueAttembs == randomWord.length) {
                                congrats()
                            }
                        }

                    });
                } else {
                    btn.classList.add("disable");
                }
            });
            if (status == false) {
                wrongAttembs++;
                let theDraw = document.querySelector(".right .container");
                theDraw.classList.add(`wrong-${wrongAttembs}`);
                if (wrongAttembs == 6) {
                    endGame();
                }
            }
        });
    });

    function congrats() {
        letterContainer.classList.add("disable");
        let popUp = document.createElement("div");
        popUp.className = "pop-up";
        let text = document.createTextNode(
            `congratulations;  your wrong attembs  =  ${wrongAttembs}`
        );
        popUp.appendChild(text);

        let replayBtn = document.createElement("div");
        replayBtn.innerHTML = "Replay";

        popUp.appendChild(replayBtn);

        replayBtn.addEventListener("click", () => resetGame());

        document.querySelector(".container").appendChild(popUp);
    }

    function endGame() {
        letterContainer.classList.add("disable");
        let popUp = document.createElement("div");
        popUp.className = "pop-up";
        let text = document.createTextNode(
            `game over; the word is ${randomWordletters.join("")}`
        );
        popUp.appendChild(text);

        let replayBtn = document.createElement("div");
        replayBtn.innerHTML = "Replay";

        popUp.appendChild(replayBtn);

        replayBtn.addEventListener("click", () => resetGame());

        document.querySelector(".container").appendChild(popUp);
    }

    function resetGame() {
        letterContainer.innerHTML = "";
        result.innerHTML = "";

        let letterSpans = document.querySelectorAll(".result span");

        letterSpans.forEach((span) => {
            span.innerHTML = "";
        });

        let btns = document.querySelectorAll(
            ".left .container .letters-cont .letter"
        );
        btns.forEach((btn) => {
            btn.classList.remove("disable");
        });

        letterContainer.classList.remove("disable");

        document.querySelector(".right .container").className = "container";

        let popUp = document.querySelector(".pop-up");
        document.querySelector(".container").removeChild(popUp);

        startGame();
    }
}
startGame();
