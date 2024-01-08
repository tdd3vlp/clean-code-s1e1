// Variables

var addNewTaskField = document.querySelector(".task__input-field"); 
var addButton = document.querySelector(".add-button"); 
var incompletedTasks = document.getElementById("to-do"); 
var completedTasks = document.getElementById("completed");


// Create New List Item

var createNewTaskElement = function(taskString) {

    var newListItem = document.createElement("li");

    var newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    
    var newLabel = document.createElement("label");
    newLabel.innerText = taskString;
    newLabel.className = 'task-name';
    
    var newInputField = document.createElement("input");
    newInputField.type = "text";
    newInputField.className = "task__input-field";
    
    var newEditButton = document.createElement("button");
    newEditButton.innerText = "Edit";
    newEditButton.className = "edit-button";

    var newDeleteButton = document.createElement("button");
    newDeleteButton.className = "delete-button";
    
    var deleteButtonImage = document.createElement("img");
    deleteButtonImage.src = './remove.svg';
  
    newDeleteButton.appendChild(deleteButtonImage);

    newListItem.appendChild(newCheckBox);
    newListItem.appendChild(newLabel);
    newListItem.appendChild(newInputField);
    newListItem.appendChild(newEditButton);
    newListItem.appendChild(newDeleteButton);

    return newListItem;
}

// Add a New Task

var addTask = function() {

  // Create a new list item with the text from the #new-task:
  if (!addNewTaskField.value) {
    return;
  };
    
  var newListItem = createNewTaskElement(addNewTaskField.value);

  incompletedTasks.appendChild(newListItem);
  bindTaskEvents(newListItem, taskCompleted);

  addNewTaskField.value = "";

}

// Edit an Existing Task

var editTask=function(){
   
  var newListItem = this.parentNode;
  var editInput = newListItem.querySelector('input[type=text]');
  var label = newListItem.querySelector("label");
  var editBtn = newListItem.querySelector(".edit-button");
  var containsClass = newListItem.classList.contains("edit-mode");

  // If class of the parent is .edit-mode
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // Toggle .edit-mode on the parent.

  newListItem.classList.toggle("edit-mode");
};

// Delete task

var deleteTask = function() {

  var newListItem = this.parentNode;
  var ul = newListItem.parentNode;

  // Remove the parent list item from the ul.
  ul.removeChild(newListItem);

}


// Mark task completed

var taskCompleted=function(){
  // Append the task list item to the #completed-tasks

  var newListItem = this.parentNode;
  completedTasks.appendChild(newListItem);
  bindTaskEvents(newListItem, taskIncomplete);
}


var taskIncomplete=function(){
  var newListItem = this.parentNode;
  incompletedTasks.appendChild(newListItem);
  bindTaskEvents(newListItem,taskCompleted);
}

// Set the click handler to the addTask function.

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);


var bindTaskEvents=function(tasknewListItem, checkBoxEventHandler) {
  // Select newListItems children
  var checkBox=tasknewListItem.querySelector("input[type=checkbox]");
  var editButton=tasknewListItem.querySelector("button.edit-button");
  var deleteButton=tasknewListItem.querySelector("button.delete-button");


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

// Cycle over incompletedTasks   ul list items
// For each list item

for (var i = 0; i < incompletedTasks.children.length; i++) {
  bindTaskEvents(incompletedTasks.children[i], taskCompleted);
}

// Cycle over completedTasks ul list items

for (var i = 0; i < completedTasks.children.length; i++) {
  bindTaskEvents(completedTasks.children[i], taskIncomplete);
}

// TODO: prevent creation of empty tasks

// TODO: Change edit to save when you are in edit mode