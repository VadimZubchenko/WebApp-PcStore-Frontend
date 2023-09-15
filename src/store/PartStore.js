import { makeAutoObservable } from "mobx";

class PartStore {
  constructor() {
    this._parts = [];

    this._selectedPart = {};

    makeAutoObservable(this);
  }
  // set-functions changes the state of variables
  setSelectedPart(parts) {
    this._selectedPart = parts;
  }

  // get-functions can be called when variables inside component had been changed (optimization)
  get selectedPart() {
    return this._selectedPart;
  }
}
export default PartStore;
