export class Item {
    constructor (name) {
        this.name = name
    }

    createDivElement() {
        let element = document.createElement("div")
        element.id = `id${this.name}`
        element.innerHTML = this.name
        return element
    }
}