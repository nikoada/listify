
import { Item } from "./itemClass.js"
import { itemsList } from "./itemsList.js"

let oElements = {}

itemsList.forEach(item => {
  let nameCapitalized = item.charAt(0).toUpperCase() + item.slice(1)
  oElements[item] = new Item(nameCapitalized).createDivElement()
})

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// setup SpeechRecognition
const recognition = new SpeechRecognition()
recognition.interimResults = true
recognition.lang = 'en-US'

// waiting for speech results
recognition.addEventListener('result', event => {
  const transcript = event.results[0][0].transcript
  console.log(transcript)
  
  // check if the voice input has ended
  if (event.results[0].isFinal && oElements[transcript]) {
    document.getElementById("mainContainer").appendChild(oElements[transcript])
  }

  if (transcript === "table") {
    addClass('table')
  }

  if (transcript === "list") {
    addClass('list')
  }

});

recognition.addEventListener('end', recognition.start)
recognition.start()

let addClass = className => {
let divs = document.getElementsByTagName('div')
    for (let i = 0; i < divs.length; i++) {
      divs[i].setAttribute( 'class', className)
    }
}