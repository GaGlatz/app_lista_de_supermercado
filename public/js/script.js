let addProduct = document.getElementById('registrar');
let containerProductEl = document.querySelector('.container__product');
let total = document.querySelector('#totalPrice');
let totalPrice = 0;
let amountItem = 0;

addProduct.addEventListener('click', () => {
    let product = document.querySelector('#produto');
    let value = document.querySelector('#valor');
    
    if (product.value == "" && value.value == "") {
        alert('Insira o nome do produto e seu valor.')
    } else if (product.value == "") {
        alert('Insira o nome do produto.')
    }else if (value.value == "") {
        alert('Insira o valor do produto.')
    }else {
        totalPrice += parseFloat(value.value);
        amountItem += 1;

        containerProductEl.innerHTML += `
            <div id="item_${amountItem}">
                <div class="container__item">
                    <p>${product.value}</p>
                    <p>${parseFloat(value.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
                    <div>
                        <button class="item__button" onclick="cloneItem(${amountItem})"><i class="fas fa-plus"></i></button>
                        <button class="item__button" onclick="deleteItem(${amountItem})"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
                <hr>
            </div>    
        `;

        total.innerHTML = `
            <h1>${totalPrice.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h1>
            <button id="clear" onclick="clearList()">Limpar Lista</button>
        `;

        product.value = '';
        value.value = '';
    }
});

function clearList() {
    containerProductEl.innerHTML = '';
    totalPrice = 0;
    total.innerHTML = `
        <h1>${totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
        <button id="clear" onclick="clearList()">Limpar Lista</button>
    `;
}

function cloneItem(item) {
    let infoItem = document.querySelectorAll(`#item_${item} > .container__item > p`);
    let product = infoItem[0].innerText;
    let value = infoItem[1].innerText;
    let numberValue = value.split("$");

    amountItem += 1;
    totalPrice += parseFloat(numberValue[1]);

    containerProductEl.innerHTML += `
        <div id="item_${amountItem}">
            <div class="container__item">
                <p>${product}</p>
                <p>${value}</p>
                <div>
                    <button class="item__button" onclick="cloneItem(${amountItem})"><i class="fas fa-plus"></i></button>
                    <button class="item__button" onclick="deleteItem(${amountItem})"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <hr>
        </div>
    `;

    total.innerHTML = `
        <h1>${totalPrice.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h1>
        <button id="clear" onclick="clearList()">Limpar Lista</button>
    `;
}

function deleteItem(item) {
    let containerItem = document.getElementById(`item_${item}`);
    let infoItem = document.querySelectorAll(`#item_${item} > .container__item > p`);
    let value = infoItem[1].innerText;
    let numberValue = value.split("$");

    totalPrice -= parseFloat(numberValue[1]);

    total.innerHTML = `
        <h1>${totalPrice.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h1>
        <button id="clear" onclick="clearList()">Limpar Lista</button>
    `;

    containerItem.remove();
}

