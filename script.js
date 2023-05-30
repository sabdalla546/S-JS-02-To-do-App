const taskName = document.getElementById('add-item');
const priority = document.getElementById('priority');
const bodyContainer = document.getElementById('body-container');
const btn = document.getElementById('add-item-to-body');
let listItem = [];
// check there is task in local storage
if (localStorage.getItem('tasks')) {
    listItem = JSON.parse(localStorage.getItem('tasks'));
}
getDataFromLocalStorage();
btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (taskName.value !== null && priority.value !== null && priority.value > 0) {
        addTaskToArray(taskName.value, priority.value);
        taskName.value = '';
        priority.value = '';
    }

});
// update and delete
bodyContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // remove element from page  
        e.target.parentElement.parentElement.remove();
        // remove from local storage
        deleteTaskFromLocalStorage(e.target.parentElement.parentElement.getAttribute('data-id'));

    }
})
function addTaskToArray(name, pri) {
    // task data
    const item = (
        {
            id: Date.now(),
            'name': name,
            'prior': pri,
        }
    );
    // push to array
    listItem.push(item);
    console.log(listItem);
    // add task to page
    addElementToPage(listItem);
    // add task to local storage
    addToLocalStorge(listItem);
}
function addElementToPage(listItem) {
    bodyContainer.innerHTML = "";
    for (let i = 0; i < listItem.length; i++) {
        const div = document.createElement('div');
        div.setAttribute('class', 'row');
        div.setAttribute('data-id', listItem[i].id);
        const id = document.createElement('span');
        id.textContent = `${i + 1}`;
        const tName = document.createElement('span');
        tName.textContent = listItem[i].name;
        const pNumber = document.createElement('span');
        pNumber.textContent = listItem[i].prior;
        const sort = document.createElement('span');
        sort.textContent = 'up';
        const action = document.createElement('span');
        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.setAttribute('class', 'edit');
        const btnDelete = document.createElement('button');
        btnDelete.textContent = "Delete";
        btnDelete.setAttribute('class', 'delete');
        action.appendChild(btnEdit);
        action.appendChild(btnDelete);
        div.appendChild(id);
        div.appendChild(tName);
        div.appendChild(pNumber);
        div.appendChild(sort);
        div.appendChild(action);
        bodyContainer.appendChild(div);
    }
}

function addToLocalStorge(listItem) {
    // set data to local storage
    window.localStorage.setItem('tasks', JSON.stringify(listItem));
}
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        addElementToPage(tasks);
    }

}

function deleteTaskFromLocalStorage(taskId) {
    listItem = listItem.filter((task) => task.id != taskId);
    addToLocalStorge(listItem);
}
