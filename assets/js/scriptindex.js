function addNewWEField() {
    const container = document.createElement('div');
    container.className = 'form-group mt-2';
    container.innerHTML = `
        <label for="weField">تجربة عمل جديدة</label>
        <textarea placeholder="أدخل الخبرة" class="form-control weField" rows="3"></textarea>
    `;
    document.querySelector('#we').appendChild(container);
}

function addNewAQField() {
    const container = document.createElement('div');
    container.className = 'form-group mt-2';
    container.innerHTML = `
        <label for="skField">مهارة جديدة</label>
        <input placeholder="أدخل المهارة" class="form-control skField">
    `;
    document.querySelector('#sk').appendChild(container);
}

function addNewEdField() {
    const container = document.createElement('div');
    container.className = 'form-group mt-2';
    container.innerHTML = `
        <label for="edField">تعليم جديد</label>
        <textarea placeholder="أدخل التعليم" class="form-control edField" rows="3"></textarea>
    `;
    document.querySelector('#ed').appendChild(container);
}

function addNewLanField() {
    const container = document.createElement('div');
    container.className = 'form-group mt-2';
    container.innerHTML = `
        <label for="laField">لغة جديدة</label>
        <input placeholder="أدخل اللغة" class="form-control laField">
    `;
    document.querySelector('#la').appendChild(container);
}

function generateCV() {
    // Code to generate CV
}

function printCV() {
    // Code to print CV
}
