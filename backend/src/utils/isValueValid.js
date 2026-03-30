const isValueValid = (value1, value2) => {
    return value1 !== null && value1 !== undefined && value2 !== null && value2 !== undefined;
}

module.exports = { isValueValid }