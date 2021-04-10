
import { Item } from "./itemClass.js"
import { itemsList } from "./itemsList.js"

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.interimResults = true
recognition.lang = 'en-US'

const startButton = document.createElement('button')

startButton.onclick = () =>  recognition.start()

startButton.innerHTML = 'Listen'
startButton.style = 'width: 100%; height: 5rem; font-size: 2rem;'

let container = document.getElementById("mainContainer")
document.body.appendChild(startButton)

recognition.addEventListener('result', event => {
  const transcript = event.results[0][0].transcript
  console.log(transcript)
  
  // check if the voice input has ended
  if (event.results[0].isFinal && itemsList.includes(transcript)) {
    let newElement = new Item(transcript).createDivElement()
    if (newElement.style.backgroundColor === 'rgb(161, 201, 53)') {
      alert('Item is already taken!')
      return
    }
    if (container.hasChildNodes()) {
      container.insertBefore(newElement, container.childNodes[0])
      return
    }
      container.appendChild(newElement)
  }

});