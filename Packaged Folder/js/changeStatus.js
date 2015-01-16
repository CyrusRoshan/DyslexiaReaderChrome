function changeStatus(){
  if (enabled==true){
    enabled = false;
    window.currentStatus = false;
    checkStatus();
  }
  else if(enabled==false) {
    enabled = true;
    window.currentStatus = true;
    checkStatus();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', changeStatus);
});