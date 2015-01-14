function changeStatus(){
  if (enabled==true){
    enabled = false;
    checkStatus();
  }
  else if(enabled==false) {
    enabled = true;
    checkStatus();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  enabled = true;
  document.querySelector('button').addEventListener('click', changeStatus);
});