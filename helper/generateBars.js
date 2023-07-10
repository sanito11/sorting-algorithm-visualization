export default function generateBars(minVal, maxVal, quantity) {
    let bars = []

    while (bars.length != quantity) {
        let value = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal) + 1
        if (!bars.includes(value)) bars.push(value)
    }
    return bars
}
