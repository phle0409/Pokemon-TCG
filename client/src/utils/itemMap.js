export const isTargetedItem = (item) => {
    switch(item) {
        case "Bill":
            return false;
        case "Computer Search":
            return true;
        case "Defender":
            return true;
        case "Energy Removal":
            return false;
        case "Energy Retrieval":
            return false;
        case "Gust of Wind":
            return true;
        case "Lass":
            return false;
        case "PlusPower":
            return true;
        case "Potion":
            return true;
        case "Professor Oak":
            return false;
        case "Super Potion":
            return false;
        case "Switch":
            return true;
        default:
            break;
    }
}

export const itemMap = (item, deck, hand, setHand) => {
    switch(item) {
        case "Bill":
            let cards = deck.draw(2);
            setHand([...hand, ...cards]);
            break;
        default:
            break;
    }
}