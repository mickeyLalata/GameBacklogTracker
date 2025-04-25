//wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
//main page 
const contentList = document.getElementById("container");
const gameList = document.getElementById("list");
const activeList = document.querySelectorAll(".list-view");
const currentlyPlaying = document.getElementById("playing");
const activeCurrent = document.querySelectorAll(".play-view");
const donePlaying = document.getElementById("done");
const activeDone = document.querySelectorAll(".done-view");

//table container
const contList = document.getElementById("game-list");
const contCurrentPlaying = document.getElementById("current-playing");
const contDonePlaying = document.getElementById("done-playing");

//reset button or back button
const rstBtn = document.getElementById("reset");
const rstBtn1 = document.getElementById("reset1");

//add game form
const gameForm = document.getElementById("game-form");
const gameFormContainer = document.getElementById("game-form-container");
const add = document.getElementById("add"); // add game button
const tableBody = document.getElementById("table-body");

//input value 
const inputLog = document.getElementsByClassName("input-log");
const inputLogs = document.getElementsByClassName("input-logs");

//mobile touch img transistion
const activeScroll = (scroll) => {
scroll.forEach(touch => {
    touch.addEventListener("touchmove", () => {
        scroll.forEach(el => el.classList.remove("active"));
        touch.classList.add("active");
    });
    touch.addEventListener("touchend", () => {
        touch.classList.remove("active");
      });
    
    touch.addEventListener("touchcancel", () => {
        touch.classList.remove("active");
      });
});
};

activeScroll(activeList);
activeScroll(activeCurrent);
activeScroll(activeDone);

//table toggle
const toggleTable = (tableTog) => {
    tableTog.forEach(toggle => {
        toggle.addEventListener("click", () => {            
            contentList.style.display = "none";
            contList.style.display = "block";
        });
        rstBtn1.addEventListener("click", () => {
            contList.style.display = "none";
            contentList.style.display = "flex"; 
        })
    });
}
toggleTable(activeList);
toggleTable(activeCurrent);
toggleTable(activeDone);

//game form toggle
add.addEventListener("click", () => {
    contentList.style.display = "none";
    gameFormContainer.style.display = "flex";
    add.style.display = "none";
});

//reset button
rstBtn.addEventListener("click", (e) => {
    e.preventDefault(); // stop form submission

    let hasValue = false;

    // Check if inputs have values
    for (let i = 0; i < inputLog.length; i++) {
        if (inputLog[i].value.trim() !== "") {
            hasValue = true;
            break;
        }
    }

    // Check if selects have values
    for (let i = 0; i < inputLogs.length; i++) {
        if (inputLogs[i].value !== "") {
            hasValue = true;
            break;
        }
    }

    // Confirm back if there's any data
    if (hasValue) {
        const confirmBack = confirm("You have unsaved data. Are you sure you want to go back?");
        if (!confirmBack) return;
    }

    // Reset and go back
    gameFormContainer.style.display = "none";
    add.style.display = "block";
    contentList.style.display = "flex";

    for (let i = 0; i < inputLog.length; i++) {
        inputLog[i].value = "";
    }

    for (let i = 0; i < inputLogs.length; i++) {
        inputLogs[i].selectedIndex = 0;
    }
});


//adding game data in the table
gameForm.addEventListener("submit", (e) => {
    e.preventDefault(); //prevents page reload

    //table data
    const title = document.getElementById("title").value;
    const platform = document.getElementById("platform").value;
    const status = document.getElementById("status").value;
    const genre = document.getElementById("genre").value;
    const actions = document.getElementById("actions").value;

    //adding table data
    const newRow = document.createElement("tr");
    const titleAdd = document.createElement("td");
    titleAdd.textContent = title;
    const platformAdd = document.createElement("td");
    platformAdd.textContent = platform;
    const statusAdd = document.createElement("td");
    statusAdd.textContent = status;
    const genreAdd = document.createElement("td");
    genreAdd.textContent = genre;
    const actionsAdd = document.createElement("td");
    actionsAdd.textContent = actions;

    //delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    //deleting tr or data
    const deleteTable = document.createElement("td");
    deleteTable.appendChild(deleteBtn);

    //edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    //editing tr or data
    const editTable = document.createElement("td");
    editTable.appendChild(editBtn);

    //adding td
    newRow.appendChild(titleAdd);
    newRow.appendChild(platformAdd);
    newRow.appendChild(statusAdd);
    newRow.appendChild(genreAdd);
    newRow.appendChild(actionsAdd);
    newRow.appendChild(deleteTable);
    newRow.appendChild(editTable);
    //adding new row
    tableBody.appendChild(newRow);

    deleteBtn.addEventListener("click", () => {

        const confirmDelete = confirm("Are you sure you want to delete this data?")

        if(confirmDelete){
            newRow.remove(); 
        }
    });

    let titleInput, platformInput, statusSelect, genreInput, actionsInput;

     // Editing the data when edit button is clicked
     editBtn.addEventListener("click", () => {
        
        if(editBtn.textContent === "Edit"){
            // Replace the title cell with an input field
            titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.value = titleAdd.textContent;

            // Replace the platform cell with an input field
            platformInput = document.createElement("input");
            platformInput.type = "text";
            platformInput.value = platformAdd.textContent;

            // Replace the status cell with a select field
            statusSelect = document.createElement("select");
            const options = ["Wants to play", "Playing", "Done"];
            options.forEach(option => {
                const optionElem = document.createElement("option");
                optionElem.value = option;
                optionElem.textContent = option;
                if (statusAdd.textContent === option) {
                    optionElem.selected = true;
                }
                statusSelect.appendChild(optionElem);
            });

            // Replace the genre cell with an input field
            genreInput = document.createElement("input");
            genreInput.type = "text";
            genreInput.value = genreAdd.textContent;

            // Replace the actions cell with an input field
            actionsInput = document.createElement("input");
            actionsInput.type = "text";
            actionsInput.value = actionsAdd.textContent;

            // Clear the current cell content and append the input fields
            titleAdd.innerHTML = "";
            platformAdd.innerHTML = "";
            statusAdd.innerHTML = "";
            genreAdd.innerHTML = "";
            actionsAdd.innerHTML = "";

            titleAdd.appendChild(titleInput);
            platformAdd.appendChild(platformInput);
            statusAdd.appendChild(statusSelect);
            genreAdd.appendChild(genreInput);
            actionsAdd.appendChild(actionsInput);

            // Change the button text to "Save"
            editBtn.textContent = "Save";
            editBtn.classList.add("save-btn");
            editBtn.classList.remove("edit-btn");
        }else{
            // When the Save button is clicked, save the new values
                titleAdd.textContent = titleInput.value;
                platformAdd.textContent = platformInput.value;
                statusAdd.textContent = statusSelect.value;
                genreAdd.textContent = genreInput.value;
                actionsAdd.textContent = actionsInput.value;

                // Change the button back to "Edit"
                editBtn.textContent = "Edit";
                editBtn.classList.add("edit-btn");
                editBtn.classList.remove("save-btn");
        }
    });


    gameForm.reset();
    alert("Game Added Successfully");
});
    
});