
const sendchat = document.querySelector("#sendBTN")
const textbox = document.querySelector("#chatbox")
const name = document.querySelector("#nimi")
const text1 = document.querySelector("#message")
let username = ""
let count = 0

while (username === "" || username === null) {
        getName()
    if (username) {
        username = username.trim()
        name.textContent = "YOUR NAME: " + username
        saveName(username)
        break
    }
    username = window.prompt("Whats your username?")
}

sendchat.addEventListener("click", function () {
    count = count + 1
    const kiri = text1.value

    const texty = document.createElement("div")

    texty.style.width = "600px"
    texty.style.borderRadius = "16px"
    texty.style.marginBottom = "10px"
    texty.style.backgroundColor = "LightBlue"
    textbox.appendChild(texty)
    texty.classList.add("kirjad")

    const users = document.createElement("h3")
    users.textContent = username
    texty.appendChild(users)
    users.classList.add("kirjad")

    const messages = document.createElement("p")
    messages.textContent = kiri
    messages.style.borderRadius = "10px"
    messages.style.fontSize = "22px"
    texty.appendChild(messages)
    messages.classList.add("kirjad")
    text1.value = ""

    if (count === 8) {
        const koik = document.querySelectorAll(".kirjad")
        for (const eemalda of koik) {
            eemalda.remove()
        }
        count = 0
        alert("Chat full")
        deleteOLD()
        text1.value = kiri
        return
    }
    save(username, kiri)
})

async function save(user, text) {
    const response = await fetch('https://tinkr.tech/sdb/Chat5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: user,
            texts: text
        })
    });

}

async function load() {
    const response = await fetch('https://tinkr.tech/sdb/Chat5');
    const saved = await response.json();
    textbox.innerHTML = ""
    let count2 = 0
    let count4 = 0
    for (const idk of saved) {
    count4 = count4 + 1
        const texty = document.createElement("div")
        texty.style.width = "600px"
        texty.style.borderRadius = "16px"
        texty.style.marginBottom = "10px"
        texty.style.backgroundColor = "LightBlue"
        textbox.appendChild(texty)
        texty.classList.add("kirjad")

        const users = document.createElement("h3")
        users.textContent = saved[count2].username
        texty.appendChild(users)
        users.classList.add("kirjad")

        const messages = document.createElement("p")
        messages.textContent = saved[count2].texts
        messages.style.borderRadius = "10px"
        messages.style.fontSize = "22px"
        texty.appendChild(messages)
        messages.classList.add("kirjad")

        count2 = count2 + 1
        count = count2
    }
    if (count === 8) {
        deleteOLD()
        count = 0
    }
}

async function deleteOLD() {
    const response = await fetch('https://tinkr.tech/sdb/Chat5');
    const saved = await response.json();
    let count3 = 0
    for (const item of saved) {
        const iden = item.id
        count3 = count3 + 1

        await fetch(`https://tinkr.tech/sdb/Chat5/${iden}`, {
            method: 'DELETE'
        });
    }
}

load()
setInterval(load, 2000)

function saveName(nimi){
    localStorage.setItem("username", JSON.stringify(nimi))
}

function getName(){
    const saved = JSON.parse(localStorage.getItem('username')) || "";
    username = saved
    name.textContent = "YOUR NAME: " + username
}