export class Item {
    constructor (name) {
        this.name = name
    }

    createDivElement() {
        let element = document.createElement("div")
        let cancelButton = document.createElement("button")
        cancelButton.innerHTML = "X"
        cancelButton.style = "float: right"
        element.id = `id${this.name}`
        element.innerHTML = this.name

        cancelButton.onclick = () => {
            let element = document.getElementById("id" + this.name)
            element.parentNode.removeChild(element)
        }
        
        element.appendChild(cancelButton)
        return element
    }
}