$(document).ready(function () {
    console.log('jQ');
    handleClicks();
    getTasks();
})

function handleClicks() {
    $('#submitBtn').on('click', addTask);
    $(document).on('click', '.isCompleteStatusBtn', handleDone);
    $(document).on('click', '.deleteBtn', handleDelete);
}

function handleDelete() {
    console.log("delete btn clicked");
    let id = $(this).data('id');
    console.log(id);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then(function (response) {
        console.log('deleted!', response);
        getTasks();
    }).catch(function (err) {
        console.log("error in delete", err);
        alert("oh no!");
    });
}

function handleDone() {
    let id = $(this).data('id');
    console.log('done button clicked', id);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: {
            is_complete: true
        }
    }).then(function (response) {
        console.log('response from handleDone', response);
        getTasks();
    }).catch(function (err) {
        console.log("error in handleDone", err);
        alert("oh no!");
    });
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        renderTasks(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

function renderTasks(tasks) {
    $('#todoList').empty();
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        console.log(task);
        if (task.is_complete) {
            $('#todoList').append(`
            <tr class="table-success">
            <td><del>${task.task}</del></td>
            <td class="isCompleteStatus"><img src="./css/check.png" alt="done!" width="25"></td>
            <td><button class="deleteBtn btn-outline-danger" data-id="${task.id}">delete</button></td>
            </tr>
        `);
        } else if (!task.is_complete) {
            $('#todoList').append(`
            <tr>
            <td>${task.task}</td>
            <td ><button class="isCompleteStatusBtn btn-outline-success" data-id="${task.id}">mark as done</button></td>
            <td><button class="deleteBtn btn-outline-danger" data-id="${task.id}">delete</button></td>
            </tr>
            `);
        }
    }
}

function addTask() {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            task: $('#newTask').val(),
            is_complete: false
        }
    }).then(function (response) {
        console.log('added a new task', response);
        $('#newTask').val('');
        getTasks();
    }).catch(function (error) {
        console.log('Error in POST', error);
        alert("whoops! can't add task!");
    });
}
