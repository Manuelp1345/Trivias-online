if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js")
        .then(reg => console.log("registro existoso", reg))
        .catch(err => console.warn("Error de registro", err))

    const form = document.querySelector("form")
    const mainPlay = document.querySelector("#mainPlay")
    const topPlayers = document.querySelector("#topPlayers")
    const MenuQuest = document.querySelector("#MenuQuest")
    const nickPlayer = document.querySelector("#nickPlayer")
    const quests = document.querySelector("#quests")

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const alertNick = $("#alertNick")

        const nick = document.querySelector("#Nick").value

        if (nick === "") {
            alertNick.text("Por favor ingrese un nombre")
            return alertNick.toggle("slow")

        }

        nickPlayer.innerHTML = `Jugador: ${nick}`

        mainPlay.style.display = "none"
        topPlayers.style.display = "none"
        MenuQuest.style.display = "block"
        nickPlayer.style.display = "block"

    })

    const changeNick = document.querySelector("#changeNick")

    changeNick.addEventListener("click", () => {
        location.reload()
    })



    const juegos = document.querySelector('button[data-id="games"]')
    const historia = document.querySelector('button[data-id="history"]')
    const musica = document.querySelector('button[data-id="music"]')
    const ciencia = document.querySelector('button[data-id="cienci"]')

    juegos.addEventListener("click", () => {
        questsApi(15)

    })
    historia.addEventListener("click", () => {
        questsApi(23)
    })
    musica.addEventListener("click", () => {
        questsApi(12)

    })
    ciencia.addEventListener("click", () => {
        questsApi(18)
    })

    const questList = []

    const questsApi = (cat) => {
        const loadin = document.querySelector("#loadin")
        loadin.innerHTML = `<div class="spinner-border text-center text-warning" role="status">
      </div><br><br> <p class="col-12 h4 text-center text-white"> Cargando...</p>`
        fetch(`https://opentdb.com/api.php?amount=20&category=${cat}&difficulty=easy&type=multiple`)
            .then(e => e.json())
            .then(e => {
                console.log(e);
                MenuQuest.style.display = "none"
                quests.style.display = "block"

                e.results.forEach(quest => {
                    questList.push({
                        pregunta: quest.question,
                        rf: quest.incorrect_answers,
                        rc: quest.correct_answer
                    })
                })
                cardQuest()
            })
    }

    const resOne = document.querySelector('button[data-id="1"]')
    const resTwo = document.querySelector('button[data-id="2"]')
    const resThree = document.querySelector('button[data-id="3"]')
    const resFour = document.querySelector('button[data-id="4"]')

    const questHtml = document.querySelector("#quest")

    let contador = 0

    let correctas = 0

    const cardQuest = () => {
        localStorage.setItem("correcta", parseInt(Math.random() * (5 - 1)) + 1)
        const correcta = localStorage.getItem("correcta")
        const questNumber = document.querySelector("#questNumber")

        questHtml.innerHTML = questList[contador].pregunta

        switch (correcta) {
            case "1":
                resOne.innerHTML = questList[contador].rc
                resTwo.innerHTML = questList[contador].rf[0]
                resThree.innerHTML = questList[contador].rf[1]
                resFour.innerHTML = questList[contador].rf[2]


                break;
            case "2":
                resOne.innerHTML = questList[contador].rf[0]
                resTwo.innerHTML = questList[contador].rc
                resThree.innerHTML = questList[contador].rf[1]
                resFour.innerHTML = questList[contador].rf[2]

                break;
            case "3":
                resOne.innerHTML = questList[contador].rf[0]
                resTwo.innerHTML = questList[contador].rf[1]
                resThree.innerHTML = questList[contador].rc
                resFour.innerHTML = questList[contador].rf[2]

                break;
            case "4":
                resOne.innerHTML = questList[contador].rf[0]
                resTwo.innerHTML = questList[contador].rf[1]
                resThree.innerHTML = questList[contador].rf[2]
                resFour.innerHTML = questList[contador].rc

                break;

        }

        questNumber.innerHTML = `${contador+1}/20`
        contador++

    }



    resOne.addEventListener("click", function() {
        quest(this)
    })
    resTwo.addEventListener("click", function() {
        quest(this)
    })
    resThree.addEventListener("click", function() {
        quest(this)
    })
    resFour.addEventListener("click", function() {
        quest(this)
    })

    const cardFinal = document.querySelector(".caja")


    const quest = (btn) => {
        console.log(contador);
        const correcta = localStorage.getItem("correcta")
        if (btn.getAttribute("data-id") == correcta) {
            confetti.start(3000)
            correctas++
            if (contador == 20) {
                return cardFinal.innerHTML = `<h3 class="text-white text-center">felicidades contesto ${correctas} preguntas correctamente</h3> <button id="changeNick" onClick="location.reload()" class="col-10 p-2 m-2 btn btn-light">Jugar de nuevo</button>`

            } else {
                return cardQuest()
            }
        }
        if (contador == 20) {
            return cardFinal.innerHTML = `<h3 class="text-white text-center">felicidades contesto ${correctas} preguntas correctamente</h3> <button id="changeNick" onClick="location.reload()" class="col-10 p-2 m-2 btn btn-light">Jugar de nuevo</button>`

        } else {
            return cardQuest()
        }

    }




}