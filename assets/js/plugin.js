HTMLElement.prototype.alpha = function(number = 100) {
    let current_color = getComputedStyle(this).getPropertyValue("background-color");
    let match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(current_color)
    number = number > 1 ? (number / 100) : number
    this.style.backgroundColor = "rgba(" + [match[1],match[2],match[3],number].join(',') +")";
}