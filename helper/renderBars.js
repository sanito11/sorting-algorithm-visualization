export default function renderBars(bars, container) {
    let elements = "";
    let highest = bars.reduce((a, b) => Math.max(a, b), -Infinity)

    for (let i = 0; i < bars.length; i++) {
        elements += `
            <div class="bar" 
            style="height: ${bars[i] / highest * 100}%; 
            width: ${90 / bars.length}%; 
            background-color: ${i % 2 == 0 ? "yellow-orange" : "pink"};">
            </div>
        `
    }

    container.innerHTML = elements
}