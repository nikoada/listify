
import { Item } from "./itemClass.js"
import { itemsList } from "./itemsList.js"

let oElements = {}

itemsList.forEach(item => {
  oElements[item] = new Item(item).createDivElement()
})

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// setup SpeechRecognition
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

// waiting for speech results
recognition.addEventListener('result', event => {
  const transcript = event.results[0][0].transcript;

  // check if the voice input has ended
  if (event.results[0].isFinal) {
    console.log(transcript);
    document.getElementById("mainContainer").appendChild(oElements[transcript])
  }
});

recognition.addEventListener('end', recognition.start);
recognition.start();