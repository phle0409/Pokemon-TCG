export const isTargetedItem = (item) => {
  switch (item) {
    case "Bill":
      return false;
    case "Computer Search":
      return false;
    case "Defender":
      return true;
    case "Energy Removal":
      return true;
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
      return true;
    case "Switch":
      return true;
    default:
      break;
  }
};