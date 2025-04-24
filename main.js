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

    newRow.appendChild(titleAdd);
    newRow.appendChild(platformAdd);
    newRow.appendChild(statusAdd);
    newRow.appendChild(genreAdd);
    newRow.appendChild(actionsAdd);
    newRow.appendChild(deleteTable);

    tableBody.appendChild(newRow);

    deleteBtn.addEventListener("click", () => {
       newRow.remove(); 
    });

    gameForm.reset();
    alert("Game Added Successfully");
});
});