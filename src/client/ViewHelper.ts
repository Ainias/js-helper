export class ViewHelper{
    /**
     * Entfernt alle Children eines Elements
     *
     * @param element
     * @returns {Node}
     */
    static removeAllChildren(element) {
        if (element instanceof Node) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
        return element;
    }

    /**
     * Moves the child-Nodes from one element to another
     * @param from
     * @param to
     * @returns {*}
     */
    static moveChildren(from, to) {
        let children = [];

        //Zwischenspeichern der Children, da removeChild die forEach-Schleife durcheinander bringt
        from.childNodes.forEach(child => {
            children.push(child);
        });

        children.forEach(child => {
            from.removeChild(child);
            to.appendChild(child);
        });
        return to;
    }
}