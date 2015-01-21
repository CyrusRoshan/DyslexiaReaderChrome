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

//Changes currentstatus and enabled on button click.
//Then it calls checkStatus in order to visually change popup.html