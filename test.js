
// we assign the same name of ids to vaiable
const todoForm=document.getElementById('todo-form');
const todoList=document.getElementById('todo-list');
const todoInput=document.getElementById('todo-input'); 

// now we need to add new task in the list by events
// syntax of events
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
   
    // new function with name newtask
    const newTask = todoInput.value;
    if (newTask === '')  
        {
        alert('Please enter a task!');
        return;
    }
  
 todoInput.value=''; 
 addTask(newTask);
});

// Creating a Function to Add Tasks

function addTask(task){
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent=task;
    listItem.appendChild(taskText);

// functionality for checkbox
const checkBox = document.createElement('input');
checkBox.setAttribute('type','checkbox');
listItem.appendChild(checkBox);

checkBox.addEventListener('change', function()
{
    if (this.checked)
        {
        taskText.style.textDecoration= 'line-through';
      } 
       else
       {
            taskText.style.textDecoration='none';
        }
    
});

// editing button
const editButton =document.createElement('button');
editButton.textContent='Edit';
listItem.appendChild(editButton);
//  event
editButton.addEventListener('click' ,function(){
    const isEditing= listItem.classList.contains('editing');
    if(
        isEditing
    )
    {
        taskText.textContent=this.previousSibling.value;
        listItem.classList.remove('editing');
        editButton.textContent='Edit';
    }
    else{
        const input = document.createElement('input');
      input.type = 'text';
      input.value = taskText.textContent;
      listItem.insertBefore(input, taskText);
      listItem.removeChild(taskText);
      listItem.classList.add('editing');
      editButton.textContent = 'Save';
    }
});

// Delete button
const deleteButton =document.createElement('button');
deleteButton.textContent='Delete';
listItem.appendChild(deleteButton);
deleteButton.addEventListener( 'click', function (){
    todoList.removeChild(listItem);
});

  // Event listeners for the checkbox and delete button will be added here
   
    todoList.appendChild(listItem);

}
function saveTasksToLocalStorage() {
    const tasks =[];
    document.querySelectorAll('#todo-list li').forEach
    (task => {
        const taskText = task.querySelector ('span').textContent;
        const isCompleted= task.classList.contains('completed');
        task.push({Text : taskText, completed : isCompleted});

    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text);
    });
  });