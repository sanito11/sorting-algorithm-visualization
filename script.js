import generateBars from './helper/generateBars.js'
import renderBars from './helper/renderBars.js'

let barCointainer = document.querySelector('.bar-container')
let sortSelection = document.querySelector('#sortSelection')
let elementsLabel = document.querySelector('#elementsLabel')
let minLabel = document.querySelector('#minLabel')
let maxLabel = document.querySelector('#maxLabel')
let speedLabel = document.querySelector('#speed')
let elementsInput = document.querySelector('#elements')
let minimumInput = document.querySelector('#minimum')
let maximumInput = document.querySelector('#maximum')
let speedInput = document.querySelector('#speedRange')
let generateBtn = document.querySelector('#generateBtn')
let sortBtn = document.querySelector('#sortBtn')

let arr = [], bars = []
let speed = 250

elementsInput.addEventListener('input',
    () => {
        minMaxChecker(minimumInput, maximumInput, elementsInput, true)
        renderInputValue(elementsLabel, 0, Number(elementsInput.value))
    }
)

elementsInput.addEventListener('change',
    () => {
        minMaxChecker(minimumInput, maximumInput, elementsInput, true)
        renderInputValue(elementsLabel, 0, Number(elementsInput.value))
    }
)

minimumInput.addEventListener('input',
    () => {
        minMaxChecker(minimumInput, maximumInput, elementsInput)
        renderInputValue(minLabel, 1, Number(minimumInput.value))
        renderInputValue(maxLabel, 2, Number(maximumInput.value))
    }
)

minimumInput.addEventListener('change',
    () => {
        minMaxChecker(minimumInput, maximumInput, elementsInput)
        renderInputValue(minLabel, 1, Number(minimumInput.value))
        renderInputValue(maxLabel, 2, Number(maximumInput.value))
    }
)

maximumInput.addEventListener('input',
    () => {
        minMaxChecker(minimumInput, maximumInput, elementsInput)
        renderInputValue(maxLabel, 2, Number(maximumInput.value))
    }
)

maximumInput.addEventListener('change',
    () => {
        minMaxChecker(minimumInput, maximumInput, elementsInput)
        renderInputValue(maxLabel, 2, Number(maximumInput.value))
    }
)

speedInput.addEventListener('input', () => {
    speed = Number(speedInput.value)
    renderInputValue(speedLabel, 3, Number(speedInput.value))
})

speedInput.addEventListener('change', () => {
    speed = Number(speedInput.value)
    renderInputValue(speedLabel, 3, Number(speedInput.value))
})



generateBtn.addEventListener('click',
    () => {
        sortBtn.disabled = false
        arr = generateNewArray(minimumInput?.value, maximumInput?.value, elementsInput?.value, barCointainer)
        bars = document.querySelectorAll('.bar')
    }
)

sortBtn.addEventListener('click', async () => {

    sortSelection.disabled = true
    generateBtn.disabled = true
    sortBtn.disabled = true
    elementsInput.disabled = true
    minimumInput.disabled = true
    maximumInput.disabled = true
    speedInput.disabled = true

    switch (sortSelection.options.selectedIndex) {
        case 0:
            await bubbleSort(arr)
            break
        case 1:
            await combSort(arr)
            break
        case 2:
            await heapSort(arr)
            break
        case 3:
            await insertionSort(arr)
            break
        case 4:
            await quickSort(arr, 0, arr.length - 1)
            break
        case 5:
            await selectionSort(arr)
            break
        case 6:
            await shellSort(arr)
            break
        default:
            break
    }

    sortSelection.disabled = false
    generateBtn.disabled = false
    elementsInput.disabled = false
    minimumInput.disabled = false
    maximumInput.disabled = false
    speedInput.disabled = false

}, false)

function generateNewArray(min, max, quantity, container) {
    let bars = generateBars(min, max, quantity)
    // console.log(bars.sort((a, b) => a - b))
    renderBars(bars, container)
    return bars
}

function renderInputValue(element, idx, value) {
    let labels = ['Number of Elements', 'Minimum Value', 'Maximum Value', 'Animation Speed']
    element.innerHTML = `${labels[idx]} <strong>(${value})</strong>`
}

function minMaxChecker(minInput, maxInput, elementInput, isElementTriggered = false) {

    let minVal = Number(minInput.value)
    let maxVal = Number(maxInput.value)
    let elementVal = Number(elementInput.value)

    if (isElementTriggered) {
        minInput.value = Number(maxInput.max) / 2
        maxInput.value = Number(minInput.value) + elementVal
    }

    if ((maxVal - minVal + 1) < elementVal) {
        maxInput.value = minVal + elementVal
    }

    if (minVal >= maxVal || (maxVal === 50000 && maxVal - minVal < elementVal)) {
        minInput.value = maxVal - elementVal
    }

    //handles if maxVal and minVal == 1
    if (minVal == maxVal) {
        maxInput.value = elementVal
        if (maxVal < minVal) {
            minimumInput.value = maxVal - elementVal + 1
        }
    }
    renderInputValue(minLabel, 1, minVal)
    renderInputValue(maxLabel, 2, maxVal)
}


async function swap(arr, index1, index2) {
    await sleep(speed)

    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let min_idx = i

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[min_idx] > arr[j]) {
                min_idx = j
            }
        }
        if (min_idx !== i) {
            await swap(arr, i, min_idx)
            toggleIndicator(bars[i])
            renderBars(arr, barCointainer)
        }
    }
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                await swap(arr, j, j + 1)
                renderBars(arr, barCointainer)

            }
        }
    }
}

async function quickSort(arr, lo, hi) {
    if (lo >= 0 && hi >= 0 && lo < hi) {
        const p = await partition(arr, lo, hi);
        await Promise.all([
            quickSort(arr, lo, p),
            quickSort(arr, p + 1, hi)
        ])
    }
}

async function partition(arr, lo, hi) {
    const pivot = arr[Math.floor((lo + hi) / 2)]
    let i = lo - 1
    let j = hi + 1
    while (true) {
        do {
            i++;
        } while (arr[i] < pivot)

        do {
            j--;
        } while (arr[j] > pivot)

        if (i >= j) {
            return j
        }

        await swap(arr, i, j)
        renderBars(arr, barCointainer)
    }
}

async function heapSort(arr) {
    let size = arr.length

    for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
        heapify(arr, size, i)

    for (let i = size - 1; i >= 0; i--) {
        swap(arr, i, 0)
        await sleep(speed)
        renderBars(arr, barCointainer)
        heapify(arr, i, 0)
    }
}

async function heapify(arr, size, i) {
    let max = i
    let left = 2 * i + 1
    let right = 2 * i + 2

    if (left < size && arr[left] > arr[max])
        max = left

    if (right < size && arr[right] > arr[max])
        max = right

    if (max != i) {
        let temp = arr[i]
        arr[i] = arr[max]
        arr[max] = temp

        heapify(arr, size, max)
    }
}

async function insertionSort(arr) {
    let i, key, j;
    for (i = 1; i < arr.length; i++) {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            await sleep(speed)
            renderBars(arr, barCointainer)
        }

        arr[j + 1] = key;
        await sleep(speed)
        renderBars(arr, barCointainer)
    }
}

async function shellSort(arr) {
    let n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i += 1) {
            let temp = arr[i]
            let j
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap]
                await sleep(speed)
                renderBars(arr, barCointainer)
            }
            arr[j] = temp
            await sleep(speed)
            renderBars(arr, barCointainer)
        }
    }
}

async function combSort(arr) {
    let length = arr.length;
    let shrink = 1.3;
    let gap = length;
    let sorted = false;

    while (!sorted) {
        gap = parseInt(gap / shrink);
        if (gap <= 1) {
            sorted = true;
            gap = 1;
        }

        for (let i = 0; i < length - gap; i++) {
            let sm = gap + i;
            if (arr[i] > arr[sm]) {
                await swap(arr, i, sm)
                renderBars(arr, barCointainer)
                sorted = false;
            }
        }
    }
}

function toggleIndicator(element) {
    element.classList.toggle('current')
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}



