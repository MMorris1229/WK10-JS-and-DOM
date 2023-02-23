
//Classes

class Item {
    constructor(category, name) {
        this.category = category;
        this.name = name;


    }
}

class Store {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.items = [];
    } 


addItem(item) {
    this.items.push(item);
    }

deleteItem(item) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    }
}

//array of stores
//each store is assigned 0 
let stores = [];
let storeId = 0;

//When new store button is clicked this creates the Store you are wanting to shop at
onClick('new-store', () => {
    stores.push(new Store(storeId++, getValue('new-store-name')));
    drawDOM();
}); 

/*Whatever function gets passed into onClick is what happens 
when the element that is grabbed by the id that matches is clicked*/
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

//This fuunction runs when getValue & a passed in value is used
function getValue(id) {
    return document.getElementById(id).value;

}

//drawDOM function adds all storeDiv to stores 
//clears storeDiv
//iterates through store array and builds a table with it 
//using data from store.name to create a title
//creating a store delete button
//add all the items to store
function drawDOM() {
    let storeDiv = document.getElementById('stores');
    clearElement(storeDiv);
    for (store of stores) {
        let table = createStoreTable(store);
        let title = document.createElement('h2');
        title.innerHTML = store.name;
        title.appendChild(createDeleteStoreButton(store));
        storeDiv.appendChild(title);
        storeDiv.appendChild(table);
        for (item of store.items) {
            createItemRow(store, table, item);
            

        }
    }
}

//this creates the item row
function createItemRow(store, table, item) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = item.category;
    row.insertCell(1).innerHTML = item.name;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(store, item));
}

//this creates a button that will delete an item row
function createDeleteRowButton(store, item) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = ' Delete'; 
    btn.onclick = () => {
        let index = store.items.indexOf(item);
        store.items.splice(index, 1);
        drawDOM();
    };
    return btn;
}

//This creates a button that will delete a store from store array 
function createDeleteStoreButton(store) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Store';
btn.onclick = () => {
    let index = stores.indexOf(store);
    stores.splice(index, 1);
    drawDOM();
     };
     return btn;
}

//This creates a button that will add items to the items array
function createNewItemButton(store) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        store.items. push(new Item(getValue(`category-input-${store.id}`), getValue(`name-input-${store.id}`)));
        drawDOM();
    };
    return btn;
}

//This takes a store and builds a table off of it.
function createStoreTable(store) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let categoryColumn = document.createElement('th');
    let nameColumn = document.createElement('th');
    categoryColumn.innerHTML = 'Category';
    nameColumn.innerHTML = 'Item';
    row.appendChild(categoryColumn);
    row.appendChild(nameColumn);
    let formRow = table.insertRow(1);
    let categoryTh = document.createElement('th');
    let nameTh = document.createElement('th');
    let createTh = document.createElement('th');
    let categoryInput = document.createElement('input');
    categoryInput.setAttribute('id', `category-input-${store.id}`);
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('class', 'form-control');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${store.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let newItemButton = createNewItemButton(store);
    categoryTh.appendChild(categoryInput);
    nameTh.appendChild(nameInput);
    createTh.appendChild(newItemButton);
    formRow.appendChild(categoryTh);
    formRow.appendChild(nameTh);
    formRow.appendChild(createTh);

    return table;
}


//This function removes the firstChild until the element is completely cleared out.
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


