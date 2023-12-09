document.addEventListener("DOMContentLoaded", () => {
  const bigBang = document.querySelector("big-bang");
  bigBang.addEventListener("click", function (ev) {
    const _target = ev.target;
    _target.character = _target.character === "ccc" ? "aaa" : "ccc";
    _target.color =
      _target.color === "cornflowerblue" ? "lightcoral" : "cornflowerblue";
  });
});
