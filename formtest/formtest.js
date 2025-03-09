function togglePreview() {
    let inputs = document.querySelectorAll('.middle input');
    let spans = document.querySelectorAll('.middle span');
    let previewing = inputs[0].style.display === 'none';

    if (!previewing) {
        inputs.forEach(input => {
            let span = document.getElementById(input.id + '-text');
            span.textContent = input.value || '—';
            input.style.display = 'none';
        });
        spans.forEach(span => span.style.display = 'inline');
    } else {
        inputs.forEach(input => input.style.display = 'inline');
        spans.forEach(span => span.style.display = 'none');
    }
}

function saveAsImage() {
    let element = document.querySelector(".form-container");
    html2canvas(element, { useCORS: true }).then(canvas => {
        let ctx = canvas.getContext('2d');
        let size = Math.min(canvas.width, canvas.height);
        let croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = size;
        croppedCanvas.height = size;
        croppedCanvas.getContext('2d').drawImage(canvas, 0, 0, size, size, 0, 0, size, size);

        let link = document.createElement('a');
        link.href = croppedCanvas.toDataURL("image/png");
        link.download = "cyberpunk_character.png";
        link.click();
    });
}

document.getElementById('photoInput').addEventListener('change', function(event) {
    let reader = new FileReader();
    reader.onload = function(e) {
        let img = document.getElementById('photoPreview');
        img.src = e.target.result;
        img.style.display = 'block'; // Відображаємо зображення
        document.querySelector('.photo-container').classList.add('hidden'); // Ховаємо + на контейнері
    };
    reader.readAsDataURL(event.target.files[0]);
});

let stats = {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10
};

function changeStat(stat, delta) {
    let totalPoints = getTotalPoints();

    // Якщо сума очок уже 77 або більше і додавання йде в плюс
    if (totalPoints >= 77 && delta > 0) {
        document.getElementById('warning').style.display = 'block';
        return;
    }

    // Якщо сума очок менша 77, ховаємо попередження
    document.getElementById('warning').style.display = 'none';

    stats[stat] += delta;
    if (stats[stat] < 1) stats[stat] = 1; // Мінімум 1 очко

    document.getElementById(stat).textContent = stats[stat];
    document.getElementById(stat + '-mod').textContent = calculateModifier(stats[stat]);
}

function getTotalPoints() {
    return Object.values(stats).reduce((a, b) => a + b, 0);
}

function calculateModifier(value) {
    return Math.floor((value - 10) / 2);
}

  // Ініціалізація модифікаторів
for (let stat in stats) {
    document.getElementById(stat + '-mod').textContent = calculateModifier(stats[stat]);
}