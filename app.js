const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editId = '';

//LocalStorage

/**
 * setItem
 * getItem
 * removeItem
 */

const getLocalStorage = ()=>{
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [] ;
}

const addToLocalStorage = (id, value) => {
    const item = {id,value};
    let items = getLocalStorage();
    items.push(item);

    localStorage.setItem('list' , JSON.stringify(items));
}

const editLocalStorage = (id, value) => {
    let items = getLocalStorage();

    items = items.map( item => {
        if(item.id === id){
            item.value = value;
        }
        return item;
    });

    localStorage.setItem('list' , JSON.stringify(items));
}

const removeFromLocalStorage = id => {
    let items = getLocalStorage();
    items = items.filter( item =>{
        if(item.id !== id) {
            return item
        }
    });

    localStorage.setItem('list' , JSON.stringify(items));
}

/******************************************************************* */

const setBackToDefault = () =>{
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

const displayAlert = (text , action) => {

    alert.textContent = text
    alert.classList.add(`alert-${action}`);

    const removeAlert = ()=> {
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`);
    }

    setTimeout(removeAlert, 2500);
}

const editItem = e => {
    const element = e.currentTarget.parentElement.previousElementSibling;
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.textContent;

    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "edit";
}

const deleteItem = e => {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);
    if(list.children.lenght  === 0){
        container.classList.remove('show-container');
    }

    displayAlert('Item removed', 'success');
    removeFromLocalStorage(id)
    setBackToDefault();
}

const clearList = () => {
    const items = document.querySelectorAll('.grocery-item');
    if(items.lenght > 0) {
        items.forEach(e => {
            list.removeChild(e)        
        });
    }   

    
    container.classList.remove("show-container");
    setBackToDefault(); 
    displayAlert('List cleared', 'success');
    localStorage.removeItem('list');
    
}

const addItem = e => {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    
    //Adding
    //Editing
    //Empty

    if (value && !editFlag) {

        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = 
            `<p class="title">${value}</p>
            <div class="btn-container">
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
                </button>
            </div>`;

        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');

        deleteBtn.addEventListener("click", deleteItem);
        editBtn.addEventListener("click", editItem);


        list.appendChild(element);

        container.classList.add('show-container');
        displayAlert('Item added to the list','success');
        addToLocalStorage(id, value);
        setBackToDefault()

    } else if (value && editFlag) {

        editElement.innerHTML = value;
        container.classList.add('show-container');
        displayAlert('Value change','success');
        editLocalStorage(editId, value);
        setBackToDefault();

    } else {

        displayAlert('Please enter value','danger');
    }

}

const setupItems = ()=> {
    items.
}


form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearList);
window.addEventListener("DOMContentLoaded", setupItems);

