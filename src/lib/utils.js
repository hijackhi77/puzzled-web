const deepcopy = (object) => {
    return JSON.parse(JSON.stringify(object))
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export {
    deepcopy,
    getRandomInt
};
