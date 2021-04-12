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
            this.deleteItemFromLocalStorage('itemElements', '-selected')
        }


        return cancelButton
    }
    
    createImageElement(elementArg) {
        let imageElement = document.createElement("img")
        imageElement.setAttribute("src", `images/${this._name}.jpg`)
        
        imageElement.onclick = () => {
            let container = document.getElementById("mainContainer")
            if (elementArg.style.backgroundColor === '') {
                elementArg.style.backgroundColor = 'rgb(161, 201, 53)'
                elementArg.parentNode.removeChild(elementArg)
                container.appendChild(elementArg)
                this.saveSelectedDeselectedItemInLocalStorage(this._name, true, 'itemElements')
                return
            }
            elementArg.style.backgroundColor = ''
            elementArg.parentNode.removeChild(elementArg)
            container.insertBefore(elementArg, container.childNodes[0])
            this.saveSelectedDeselectedItemInLocalStorage(this._name, false, 'itemElements')
        }
        return imageElement
    }
    
    deleteItemFromLocalStorage(storageKey, sufix) {
        let aStoredList = localStorage.getItem(storageKey).split(',')
        let aNewListForStorage = aStoredList.filter( item => item !== this._name && item !== this._name + sufix)
        localStorage.setItem(storageKey, aNewListForStorage)
    }
    
    saveSelectedDeselectedItemInLocalStorage(itemName, selectBool, storageKey) {
        let aStoredList = localStorage.getItem(storageKey).split(',')
        let itemIndex = aStoredList.indexOf(selectBool ? itemName : `${itemName}-selected`)
        aStoredList.splice(itemIndex, 1, selectBool ? `${itemName}-selected` : itemName)
        localStorage.setItem(storageKey, aStoredList)
    }
}