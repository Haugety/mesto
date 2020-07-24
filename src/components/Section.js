export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items) {
    items.reverse().forEach(item => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }

}
