export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(item) {
    this._containerSelector.append(item);
  }

}