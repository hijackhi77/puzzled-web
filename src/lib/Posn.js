class Posn {
  constructor(row, col) {
    this.row = row
    this.col = col
  }

  getValue = () => {
    return { row: this.row, col: this.col }
  }

  go = (direction) => {
    let neighbour = null
    if (direction === "left") {
      neighbour = new Posn(this.row, this.col - 1)
    } else if (direction === "right") {
      neighbour = new Posn(this.row, this.col + 1)
    } else if (direction === "up") {
      neighbour = new Posn(this.row - 1, this.col)
    } else if (direction === "down") {
      neighbour = new Posn(this.row + 1, this.col)
    }
    return neighbour
  }

  static isEqual = (a, b) => {
    return a.row === b.row && a.col === b.col
  }

  static includes = (a, array) => {
    for (let b of array) if (Posn.isEqual(a, b)) return true
    return false
  }

  // Return the direction that pos can use to result in other
  static getRelativeDir = (posFrom, posTo) => {
    let direction = null
    if (posFrom.row - posTo.row === 1) {
      direction = "up"
    } else if (posFrom.row - posTo.row === -1) {
      direction = "down"
    } else if (posFrom.col - posTo.col === 1) {
      direction = "left"
    } else if (posFrom.col - posTo.col === -1) {
      direction = "right"
    }
    return direction
  }

  static getOppositeDir = (direction) => {
    if (direction === "left") return "right"
    if (direction === "right") return "left"
    if (direction === "up") return "down"
    if (direction === "down") return "up"
  }
}

export default Posn
