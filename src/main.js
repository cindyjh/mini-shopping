
// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items)
}

// Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items')
    container.innerHTML = items.map(item => createHTMLString(item)).join('')
}

// Create HTML list item from the given item
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    // 이벤트 위임: 하나하나의 이벤트 리스너를 반복해서 등록하는 것 보다, 버튼들이 들어있는 컨테이너에 이벤트 리스너를 등록해서 한 곳에서만 핸들링을 할 수 있도록 한다.
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items))
    buttons.addEventListener('click', event => onButtonClick(event, items))
}

// main
loadItems()
    .then(items => {
        console.log(items)
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log)