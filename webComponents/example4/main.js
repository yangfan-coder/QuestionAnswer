document.addEventListener('DOMContentLoaded', () => {
});

function hello(ev) {
  console.log(ev);
}
function goodbye() {
  let bb = document.querySelector('big-bang');
  bb.remove();
}