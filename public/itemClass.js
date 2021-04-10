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
        }
        return cancelButton
    }
    
    createImageElement(elementArg) {
        let imageElement = document.createElement("img")
        imageElement.setAttribute("src", `images/${this._name}.jpg`)
        
        imageElement.onclick = () => {
            elementArg.style.backgroundColor = 'rgb(161, 201, 53)'
            elementArg.parentNode.removeChild(elementArg)
            document.getElementById("mainContainer").appendChild(elementArg)
        }
        return imageElement
    }
}