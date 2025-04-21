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
            contList.style.display = "block";
            contentList.style.display = "none";
        });
        rstBtn.addEventListener("click", () => {
            contList.style.display = "none";
            contentList.style.display = "flex";
        });
    });
}
toggleTable(activeList);
toggleTable(activeCurrent);
toggleTable(activeDone);