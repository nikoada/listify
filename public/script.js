
import { Item } from "./itemClass.js"
import { itemsList } from "./itemsList.js"

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.interimResults = true
recognition.lang = 'en-US'

let container = document.getElementById("mainContainer")

const btnContainer = document.createElement('div')
const startBtn = document.createElement('button')
const deleteAllBtn = document.createElement('button')

btnContainer.style = 'display: flex;'

startBtn.onclick = () =>  recognition.start()
startBtn.innerHTML = 'Add'
startBtn.style = 'width: 85%; height: 5rem; font-size: 2rem;'

deleteAllBtn.innerHTML = 'Del'
deleteAllBtn.style = 'width: 15%; height: 5rem; font-size: 2rem; background-color: black; color: white;'
deleteAllBtn.onclick = () =>  {
  if (!container.hasChildNodes()) {
    alert('There is nothing to delete!')
    return
  }
  if (window.confirm('Do you want to delete the whole shoping list?')) {
    container.innerHTML = ''
    localStorage.clear()
  }
  // returning false prevents page for refreshing
  return false
}

btnContainer.appendChild(startBtn)
btnContainer.appendChild(deleteAllBtn)

document.body.appendChild(btnContainer)

let createElementsFromLocalStorage = (lsKey, className, containerElement) => {
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

createElementsFromLocalStorage('itemElements', Item, container)


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
    localStorage.setItem('itemElements', [... storedList, transcript])

    if (container.hasChildNodes()) {
      container.insertBefore(newElement, container.childNodes[0])
      return
    }
    
    container.appendChild(newElement)
  }
});
