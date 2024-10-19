
function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
    const colors = ['красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
    const usedColors = {};
    let count = 0;

    console.log('цветов: ' + colorsCount);

    while (count < colorsCount) {
        const n = randomDiap(0, colors.length - 1);
        const colorName = colors[n];

        if (!usedColors[colorName]) {
            usedColors[colorName] = true;
            console.log(colorName);
            count++;
        }
    }
}

mood(4);
