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

//table value
const gameTable1 = document.getElementById("game-table1").querySelector("tbody");
const gameTable2 = document.getElementById("game-table2").querySelector("tbody");
const gameTable3 = document.getElementById("game-table3").querySelector("tbody");

// Retrieve data from localStorage
let gameData = JSON.parse(localStorage.getItem("gameData")) || [];

// Render the table from localStorage on page load
function renderFromLocalStorage() {
    gameData.forEach(({ title, checkedPlatform, status, genre, actions }) => {
        addGameToTable(title, checkedPlatform, status, genre, actions);
    });
}

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
activeList.forEach(toggle => {
        toggle.addEventListener("click", () => {            
            contentList.classList.add("hidden");
            contentList.classList.remove("flex");
            contList.classList.remove("hidden");
            rstBtn1.classList.remove("hidden");
        });
});
activeCurrent.forEach(toggle => {
    toggle.addEventListener("click", () => {            
        contentList.classList.add("hidden");
        contentList.classList.remove("flex");
        contCurrentPlaying.classList.remove("hidden");
        rstBtn1.classList.remove("hidden");
    });
});
activeDone.forEach(toggle => {
    toggle.addEventListener("click", () => {            
        contentList.classList.add("hidden");
        contentList.classList.remove("flex");
        contDonePlaying.classList.remove("hidden");
        rstBtn1.classList.remove("hidden");
    });
});
rstBtn1.addEventListener("click", () => {
            contList.classList.add("hidden");
            contCurrentPlaying.classList.add("hidden");
            contDonePlaying.classList.add("hidden");
            contentList.classList.remove("hidden");
            contentList.classList.add("flex");
            rstBtn1.classList.add("hidden");
});


//game form toggle
add.addEventListener("click", () => {
    contentList.classList.add("hidden");
    contentList.classList.remove("flex");
    gameFormContainer.classList.remove("hidden");
    add.classList.add("hidden");
    add.classList.remove("block");
    contList.classList.add("hidden");
    contCurrentPlaying.classList.add("hidden");
    contDonePlaying.classList.add("hidden");
    rstBtn1.classList.add("hidden");
});

//reset button
rstBtn.addEventListener("click", (e) => {
    e.preventDefault(); // stop form submission
    
    const clearCheckbox = document.querySelectorAll(".clear-logs");
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

    // Check if checkbox have values
    for (let i = 0; i < clearCheckbox.length; i++) {
        if (clearCheckbox[i].checked) {
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
    gameFormContainer.classList.add("hidden");
    add.classList.remove("hidden");
    add.classList.add("block");
    contentList.classList.remove("hidden");
    contentList.classList.add("flex");

    for (let i = 0; i < inputLog.length; i++) {
        inputLog[i].value = "";
    }

    for (let i = 0; i < inputLogs.length; i++) {
        inputLogs[i].selectedIndex = 0;
    }

    clearCheckbox.forEach(checkbox => {
        checkbox.checked = false;
    });
});

// Add a game to the table
function addGameToTable(title, checkedPlatform, status, genre, actions) {
    const newRow = document.createElement("tr");
    
    //adding table data
    const titleAdd = document.createElement("td");
    titleAdd.textContent = title;
    const platformAdd = document.createElement("td");
    platformAdd.textContent = Array.isArray(checkedPlatform) ? checkedPlatform.join(" / ") : checkedPlatform;
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

    //assigning table row data in their respective tables
    let targetTable;
    if(status === "Wants to play"){
        targetTable = gameTable1;
    } else if(status === "Playing"){
        targetTable = gameTable2;
    } else if(status === "Done"){
        targetTable = gameTable3;
    }

    if(targetTable){
        targetTable.appendChild(newRow);
    }

    deleteBtn.addEventListener("click", () => {

        const confirmDelete = confirm("Are you sure you want to delete this data?")

        if(confirmDelete){
            const index = gameData.findIndex(game => game.title === title);
            if (index !== -1){
                gameData.splice(index, 1);
                localStorage.setItem("gameData", JSON.stringify(gameData)); // Delete in local storage
            } 
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

            const availablePlatforms = ["PS1", "PS2", "PS3", "PS4", "PS5", "PSP", "XBOX", "Windows", "Android", "IOS", "3ds", "Nds", "Nintendo Switch"];
            platformInput = document.createElement("div");
            platformInput.classList.add("platform-edit-checkboxes"); // Optional styling hook

            // Convert current platforms back to array
            const currentPlatforms = platformAdd.textContent.split(" / ").map(p => p.trim());

            // Create checkboxes
            availablePlatforms.forEach(platform => {
                const label = document.createElement("label");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "platform-edit";
                checkbox.value = platform;

                if (currentPlatforms.includes(platform)) {
                    checkbox.checked = true;
                }

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(platform));
                platformInput.appendChild(label);
            });

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
            actionsInput = document.createElement("textarea");
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
            const newTitle = titleInput.value.trim();
            // Check for duplicate title across all tables (excluding the current row)
            const allTables = [gameTable1, gameTable2, gameTable3];
            for (let table of allTables) {
                const rows = table.getElementsByTagName("tr");
                for (let row of rows) {
                    const existingTitle = row.cells[0].textContent.trim();
                    if (
                        existingTitle.toLowerCase() === newTitle.toLowerCase() &&
                        row !== newRow // make sure it's not the same row being edited
                        ) {
                        alert("A game with this title already exists!");
                        return; // Stop saving changes
                    }
                }
            }
            const selectedPlatforms = Array.from(platformInput.querySelectorAll('input[name="platform-edit"]:checked')).map(cb => cb.value);
                if (selectedPlatforms.length === 0) {
                alert("Please select at least one platform.");
                return; // prevent saving
                }

                // Update the object in gameData
              const gameIndex = gameData.findIndex(game => game.title === title);
                if (gameIndex !== -1) {
                    gameData[gameIndex] = {
                    title: titleInput.value.trim(),
                    checkedPlatform: selectedPlatforms,
                    status: statusSelect.value,
                    genre: genreInput.value.trim(),
                    actions: actionsInput.value.trim()
                    };
                    localStorage.setItem("gameData", JSON.stringify(gameData));
                }

                // When the Save button is clicked, save the new values
                titleAdd.textContent = titleInput.value;
                platformAdd.textContent = selectedPlatforms.join(" / ");
                statusAdd.textContent = statusSelect.value;
                genreAdd.textContent = genreInput.value;
                actionsAdd.textContent = actionsInput.value;

                // Change the button back to "Edit"
                editBtn.textContent = "Edit";
                editBtn.classList.add("edit-btn");
                editBtn.classList.remove("save-btn");

                // Remove the row from the current table
                const currentTable = newRow.closest("tbody");
                currentTable.removeChild(newRow);

                // Reassign the row to the correct table based on the new status
                let newTargetTable;
                if (statusSelect.value === "Wants to play") {
                    newTargetTable = gameTable1;
                    alert("Data Updated Successfully");
                } else if (statusSelect.value === "Playing") {
                    newTargetTable = gameTable2;
                    alert("Data Updated Successfully");
                } else if (statusSelect.value === "Done") {
                    newTargetTable = gameTable3;
                    alert("Data Updated Successfully");
                }

                // Append the row to the new table
                if (newTargetTable) {
                    newTargetTable.appendChild(newRow);
                }
        }
    });
};

//adding game data in the table
gameForm.addEventListener("submit", (e) => {
    e.preventDefault(); //prevents page reload

    //table data
    const title = document.getElementById("title").value.trim();
    const status = document.getElementById("status").value;
    const genre = document.getElementById("genre").value.trim();
    const actions = document.getElementById("actions").value.trim();
    const checkedPlatform = Array.from(document.querySelectorAll('input[name="platforms"]:checked')).map(cb => cb.value);

    if(!title){
        alert("title is required.");
        return;
    }
    if(checkedPlatform.length === 0){
        alert("please enter at least one platform.");
        return; //stop form submission
    }

    // Check for duplicate title across all tables
    const allTables = [gameTable1, gameTable2, gameTable3];
    for (let table of allTables) {
        const rows = table.getElementsByTagName("tr");
        for (let row of rows) {
            const existingTitle = row.cells[0]?.textContent?.trim();
            if (existingTitle?.toLowerCase() === title.toLowerCase()) {
                alert("A game with this title already exists!");
                return; // Stop form submission
            }
        }
    }

   
    const newGame = { title, checkedPlatform, status, genre, actions };
    gameData.push(newGame);
    localStorage.setItem("gameData", JSON.stringify(gameData));
    addGameToTable(title, checkedPlatform, status, genre, actions);

    gameForm.reset(); // Reset form after submission
    alert("Game Added Successfully");
});

// Initialize by rendering games from localStorage
document.addEventListener("DOMContentLoaded", renderFromLocalStorage);