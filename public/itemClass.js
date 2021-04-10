export class Item {
    constructor (name) {
        this.name = name
    }

    createDivElement() {
        let element = document.createElement("div")
        let cancelButton = document.createElement("button")
        let imageElement = document.createElement("img")
        imageElement.setAttribute("src", `images/${this.name}.jpg`)
        cancelButton.innerHTML = "X"
        element.id = `id${this.name}`
        // element.innerHTML = this.name

        cancelButton.onclick = () => {
            element.style.backgroundColor = ''
            element.parentNode.removeChild(element)
        }

        imageElement.onclick = () => {
            element.style = "background-color: #A1C935"
            element.parentNode.removeChild(element)
            document.getElementById("mainContainer").appendChild(element)
        }
                
        element.appendChild(imageElement)
        element.appendChild(cancelButton)
        return element
    }
}