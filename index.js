const COLORS = {
    'Black': '#000000',
    'Navy': '#000080',
    'DarkBlue': '#00008B',
    'MediumBlue': '#0000CD',
    'Blue': '#0000FF',
    'DarkGreen': '#006400',
    'Green': '#008000',
    'Teal': '#008080',
    'DarkCyan': '#008B8B',
    'DeepSkyBlue': '#00BFFF',
    'DarkTurquoise': '#00CED1',
    'MediumSpringGreen': '#00FA9A',
    'Lime': '#00FF00',
    'SpringGreen': '#00FF7F',
    'Aqua': '#00FFFF',
    'Cyan': '#00FFFF',
    'MidnightBlue': '#191970',
    'DodgerBlue': '#1E90FF',
    'LightSeaGreen': '#20B2AA',
    'ForestGreen': '#228B22',
    'SeaGreen': '#2E8B57',
    'DarkSlateGray': '#2F4F4F',
    'LimeGreen': '#32CD32',
    'MediumSeaGreen': '#3CB371',
    'Turquoise': '#40E0D0',
    'RoyalBlue': '#4169E1',
    'SteelBlue': '#4682B4',
    'DarkSlateBlue': '#483D8B',
    'MediumTurquoise': '#48D1CC',
    'Indigo': '#4B0082',
    'DarkOliveGreen': '#556B2F',
    'CadetBlue': '#5F9EA0',
    'CornflowerBlue': '#6495ED',
    'RebeccaPurple': '#663399',
    'MediumAquaMarine': '#66CDAA',
    'DimGray': '#696969',
    'SlateBlue': '#6A5ACD',
    'OliveDrab': '#6B8E23',
    'SlateGray': '#708090',
    'LightSlateGray': '#778899',
    'MediumSlateBlue': '#7B68EE',
    'LawnGreen': '#7CFC00',
    'Chartreuse': '#7FFF00',
    'Aquamarine': '#7FFFD4',
    'Maroon': '#800000',
    'Purple': '#800080',
    'Olive': '#808000',
    'Gray': '#808080',
    'SkyBlue': '#87CEEB',
    'LightSkyBlue': '#87CEFA',
    'BlueViolet': '#8A2BE2',
    'DarkRed': '#8B0000',
    'DarkMagenta': '#8B008B',
    'SaddleBrown': '#8B4513',
    'DarkSeaGreen': '#8FBC8F',
    'LightGreen': '#90EE90',
    'MediumPurple': '#9370DB',
    'DarkViolet': '#400D3',
    'PaleGreen': '#98FB98',
    'DarkOrchid': '#9932CC',
    'YellowGreen': '#9ACD32',
    'Sienna': '#A0522D',
};

let activeColors = [];
let actualColor;
let tries = 0;

function getRandomColors(count) {
    const items = []
    const colorsNames = Object.keys(COLORS);
    const colorHexs = Object.values(COLORS);

    while (items.length < count) {
        const index = Math.floor(Math.random() * colorsNames.length);
        if (items.some(x => x.hex === colorHexs[index])) {
            continue;
        }
        items.push({name: colorsNames[index], hex: colorHexs[index]})
    }
    return items;
}

function initGame() {
    const inputEl = document.getElementById('colorNameGuess')
    inputEl.value = ''

    document.body.style.background = '#222222';
    tries = 0;
    const gameSection = document.getElementById('game');
    gameSection.classList.add('active')

    activeColors = getRandomColors(10);

    actualColor = activeColors[Math.floor(Math.random() * activeColors.length)]

    const hintBoxEl = document.getElementById('hint-box')
    hintBoxEl.replaceChildren();

    const colorsList = document.getElementById("colors");
    colorsList.replaceChildren();

    activeColors.forEach(color => {
        let el = document.createElement('span');
        el.classList.add('color-item')
        el.innerHTML = `<span class="color-square" style="background-color: ${color.hex}"></span> <span>${color.name}</span>`
        colorsList.append(el);
    })
}

function startGame() {
    const startSection = document.getElementById('start');
    startSection.classList.remove('active')
    initGame();
}

function makeGuess() {
    const inputEl = document.getElementById('colorNameGuess')
    const colorName = inputEl.value.trim();

    const hintBoxEl = document.getElementById('hint-box')
    hintBoxEl.replaceChildren();

    if (actualColor.name === colorName) {
        showWinState();
        return;
    }

    if (!activeColors.some(c => c.name === colorName)) {
        let hintEl = document.createElement('span');
        hintEl.innerText = 'Invalid color';
        hintBoxEl.append(hintEl);
    } else if (actualColor.name > colorName) {
        let hintEl = document.createElement('span');
        hintEl.innerText = 'Your color is alphabetically lower than mine.';
        hintBoxEl.append(hintEl);
    } else if (actualColor.name < colorName) {
        let hintEl = document.createElement('span');
        hintEl.innerText = 'Your color is alphabetically greater than mine.';
        hintBoxEl.append(hintEl);
    }

    tries++;

    if (tries >= 3) {
        showDefeatState();
    }
}

function showDefeatState() {
    const gameSection = document.getElementById('game');
    gameSection.classList.remove('active')

    const defeatSection = document.getElementById('defeat');
    defeatSection.classList.add('active')
}

function showWinState() {
    document.body.style.background = actualColor.hex;
    const gameSection = document.getElementById('game');
    gameSection.classList.remove('active')

    const winSection = document.getElementById('win');
    winSection.classList.add('active')
}

function tryAgain(prevState) {
    const prevSection = document.getElementById(prevState);
    prevSection.classList.remove('active')
    initGame();
}

