const contentList = document.getElementById("container");
const gameList = document.getElementById("list");
const activeList = document.querySelectorAll(".list-view");
const currentlyPlaying = document.getElementById("playing");
const activeCurrent = document.querySelectorAll(".play-view");
const donePlaying = document.getElementById("done");
const activeDone = document.querySelectorAll(".done-view");
const contList = document.getElementById("game-list");
const contCurrentPlaying = document.getElementById("current-playing");
const contDonePlaying = document.getElementById("done-playing");
const rstBtn = document.getElementById("reset");
const rstBtn1 = document.getElementById("reset1");
const gameForm = document.getElementById("game-form");
const add = document.getElementById("add");
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
            contentList.style.display = "flex";
            contList.style.display = "none";
        })
    });
}
toggleTable(activeList);
toggleTable(activeCurrent);
toggleTable(activeDone);

//game form toggle
add.addEventListener("click", () => {
    contentList.style.display = "none";
    gameForm.style.display = "flex";
    toggleTable.style.display = "none";
});

//reset button
rstBtn.addEventListener("click", () => {
    gameForm.style.display = "none";
    contentList.style.display = "flex";

    // Clear all inputs with class "input-log"
    for (let i = 0; i < inputLog.length; i++) {
        inputLog[i].value = "";
    }

    // Reset all selects with class "input-logs"
    for (let i = 0; i < inputLogs.length; i++) {
        inputLogs[i].selectedIndex = 0;
    }
});
