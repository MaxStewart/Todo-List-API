const uri = 'api/TodoItems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    $('#collapseOne').collapse('hide');
    const addNameTextbox = document.getElementById('add-name');

    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('defaultUnchecked').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function changeEditText() {
    // Get the text from the selected option
    const select = document.getElementById('selectMenu');
    const itemText = select.options[select.selectedIndex].text;
    // Add the text from the selected option to the input box
    document.getElementById('edit-name').value = itemText;
}

function updateItem() {
    $('#collapseTwo').collapse('hide');
    const itemId = document.getElementById('selectMenu').value;

    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('defaultUnchecked').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    document.getElementById('edit-name').value = '';
    document.getElementById('defaultUnchecked').checked = false;

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    //closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const select = document.getElementById('selectMenu');
    select.innerHTML = '';
    select.append(new Option('Please Select:', ''));
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        // Add an option to the select menu
        select.append(new Option(item.name, item.id));

        // Add Items to the table
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let deleteButton = button.cloneNode(false);
        deleteButton.className += 'btn btn-sm btn-danger';
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td4 = tr.insertCell(2);
        td4.appendChild(deleteButton);
    });

    todos = data;
}