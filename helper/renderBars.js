export default function renderBars(bars, container) {
    let elements = "";
    let highest = bars.reduce((a, b) => Math.max(a, b), -Infinity)

    for (let i = 0; i < bars.length; i++) {
        elements += `
            <div class="bar" 
            style="height: ${bars[i] / highest * 100}%; 
            width: ${90 / bars.length}%; 
            background-color: "yellow-orange";>
            </div>
        `
    }

    container.innerHTML = elements
}