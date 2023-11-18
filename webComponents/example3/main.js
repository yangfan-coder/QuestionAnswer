document.addEventListener("DOMContentLoaded", () => {
  const bb = document.querySelector("big-bang");
  bb.addEventListener("click", changeCharacter);
});

function changeCharacter(ev) {
  const bb = ev.target;

  console.log(bb.character, '===>bb.character');
  console.log(bb.character, '====>bb.color');
  bb.character = bb.character === "Leonard" ? "Sheldon" : "Leonard";
  bb.color = bb.color === "cornflowerblue" ? "lightcoral" : "cornflowerblue";
}
