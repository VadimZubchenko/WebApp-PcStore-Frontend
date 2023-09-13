import { makeAutoObservable } from "mobx";

class PartStore {
  constructor() {
    /* this._parts = [
      {
        partID: 1,
        partName: "Asus 7500 XL",
        partPrice: 750,
        stockQuantity: 312,
        partType: "motheboard",
        shelfNumber: "11A",
      },
      {
        partID: 2,
        partName: "Intel 5700 SE",
        partPrice: 599,
        stockQuantity: 299,
        partType: "processor",
        shelfNumber: "11A",
      },
    ]; */
    this._selectedPart = {};
    makeAutoObservable(this);
  }
  // set-functions changes the state of variables
  setSelectedPart(part) {
    this._selectedPart = part;
  }

  setParts(parts) {
    this._parts = parts;
  }
  // get-functions can be called when variables inside component had been changed (optimization)
  get selectedPart() {
    return this._selectedPart;
  }
  get parts() {
    return this._parts;
  }
}
export default PartStore;
