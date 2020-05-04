const deepcopy = (object) => {
  return JSON.parse(JSON.stringify(object))
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const flatten = (twoDimensionalArray) => {
  let seq = []
  for (let i = 0; i < twoDimensionalArray.length; ++i) {
    for (let j = 0; j < twoDimensionalArray[i].length; ++j) {
      seq.push(twoDimensionalArray[i][j])
    }
  }
  return seq
}

export { deepcopy, getRandomInt, sleep, flatten }
