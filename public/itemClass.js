export class Item {
    constructor (name) {
        this._name = name
        this._element = document.createElement("div")
    }

    createDivElement() {
        this._element.id = `id${this._name}`
        this._element.appendChild(this.createImageElement(this._element))
        this._element.appendChild(this.createCancelButton(this._element))
        return this._element
    }
    
    createCancelButton(elementArg) {
        let cancelButton = document.createElement("button")
        cancelButton.innerHTML = "X"

        cancelButton.onclick = () => {
            elementArg.style.backgroundColor = ''
            elementArg.parentNode.removeChild(elementArg)
            let aStoredList = localStorage.getItem('itemElements').split(',')
            let aNewListForStorage = aStoredList.filter( item => item !== this._name && item !== `${this._name}-selected`)
            localStorage.setItem('itemElements', aNewListForStorage)
        }


        return cancelButton
    }
    
    createImageElement(elementArg) {
        let imageElement = document.createElement("img")
        imageElement.setAttribute("src", `images/${this._name}.jpg`)
        
        imageElement.onclick = () => {
            let container = document.getElementById("mainContainer")
            let aStoredList = localStorage.getItem('itemElements').split(',')
            if (elementArg.style.backgroundColor === '') {
                elementArg.style.backgroundColor = 'rgb(161, 201, 53)'
                elementArg.parentNode.removeChild(elementArg)
                container.appendChild(elementArg)
                let itemIndex = aStoredList.indexOf(this._name)
                aStoredList.splice(itemIndex, 1, `${this._name}-selected`)
                localStorage.setItem('itemElements', aStoredList)
                return
            }
            elementArg.style.backgroundColor = ''
            elementArg.parentNode.removeChild(elementArg)
            container.insertBefore(elementArg, container.childNodes[0])
            let itemIndex = aStoredList.indexOf(`${this._name}-selected`)
            aStoredList.splice(itemIndex, 1, this._name)
            localStorage.setItem('itemElements', aStoredList)
        }
        return imageElement
    }
}