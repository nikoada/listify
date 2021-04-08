
import { Item } from "./itemClass.js"
import { itemsList } from "./itemsList.js"

let oElements = {}

itemsList.forEach(item => {
  oElements[item] = new Item(item).createDivElement()
})

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// setup SpeechRecognition
const recognition = new SpeechRecognition()
recognition.interimResults = true
recognition.lang = 'en-US'

var mouseDown = 0
const startButton = document.createElement('button')
startButton.onmousedown = () => {
  recognition.start()
  console.log('Ready to receive a command.')
  ++mouseDown
  console.log('mousedown', mouseDown)
}
startButton.onmouseup = () => {
  recognition.abort()
  console.log('Receiveing of commands has stoped.')
  --mouseDown
  console.log('mouseup', mouseDown)
}

startButton.touchstart = () => {
  recognition.start()
  console.log('Ready to receive a command.')
  ++mouseDown
  console.log('mousedown', mouseDown)
}
startButton.touchend = () => {
  recognition.abort()
  console.log('Receiveing of commands has stoped.')
  --mouseDown
  console.log('mouseup', mouseDown)
}

startButton.innerHTML = 'Listen'
startButton.style = 'width: 100%; Height: 5rem; font-size: 2rem;'

let container = document.getElementById("mainContainer")
document.body.insertBefore(startButton, container)

// waiting for speech results
recognition.addEventListener('result', event => {
  const transcript = event.results[0][0].transcript
  console.log(transcript)
  
  // check if the voice input has ended
  if (event.results[0].isFinal && oElements[transcript]) {
    if (container.hasChildNodes()) {
      container.insertBefore(oElements[transcript], container.childNodes[0])
    } else {
      container.appendChild(oElements[transcript])
    }

    
  }

  if (transcript === "table") {
    addClass('table')
  }

  if (transcript === "list") {
    addClass('list')
  }

});

recognition.addEventListener('end', () => mouseDown ? recognition.start() : null )

let addClass = className => {
let divs = document.getElementsByTagName('div')
    for (let i = 0; i < divs.length; i++) {
      divs[i].setAttribute( 'class', className)
    }
}