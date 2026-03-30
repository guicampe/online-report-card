const resolveValue = (newValue, currentValue) => {
    return newValue !== undefined ? newValue : currentValue;
}

module.exports = { resolveValue }