
import { Item } from "./itemClass.js"
import { itemsList } from "./itemsList.js"

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.interimResults = true
recognition.lang = 'en-US'

const startButton = document.createElement('button')

startButton.onclick = () =>  recognition.start()

startButton.innerHTML = 'Add'
startButton.style = 'width: 100%; height: 5rem; font-size: 2rem;'

let container = document.getElementById("mainContainer")
document.body.appendChild(startButton)

let getLocalStorage = (lsKey, className, containerElement) => {
  let savedUserList = localStorage.getItem(lsKey)
  let arrSavedList = savedUserList && savedUserList.split(',')
  arrSavedList && arrSavedList.forEach( item => {
    
    if (item.split('-')[1] === 'selected') {
      let newElement = new className(item.split('-')[0]).createDivElement()
      newElement.style.backgroundColor = 'rgb(161, 201, 53)'
      containerElement.appendChild(newElement)
      return
    }

    let newElement = new className(item).createDivElement()
      if (containerElement.hasChildNodes()) {
        containerElement.insertBefore(newElement, container.childNodes[0])
        return
      }
      containerElement.appendChild(newElement)
  })
}

getLocalStorage('itemElements', Item, container)


recognition.addEventListener('result', event => {
  const transcript = event.results[0][0].transcript
  console.log(transcript)
  
  // check if the voice input has ended
  if (event.results[0].isFinal && itemsList.includes(transcript)) {
    let elAlreadyExists = [... container.childNodes].filter(item => item.id === `id${transcript}`).length
    if (elAlreadyExists !== 0) {
      alert("Already in the list!")
      return
    }

    let newElement = new Item(transcript).createDivElement()

    let storedList = [] 
    if (localStorage.getItem('itemElements')) storedList = localStorage.getItem('itemElements').split(',')
    storedList.push(transcript)
    localStorage.setItem('itemElements', [... storedList])

    if (container.hasChildNodes()) {
      container.insertBefore(newElement, container.childNodes[0])
      return
    }
    
    container.appendChild(newElement)
  }
});
