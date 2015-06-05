function changeStatus(){
  if (enabled===true){
    enabled = false;
    window.currentStatus = false;
    saveDomainValues();
    checkStatus();
  }
  else if(enabled===false) {
    enabled = true;
    window.currentStatus = true;
    saveDomainValues();
    checkStatus();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', changeStatus);
});

//Changes currentstatus and enabled on button click.
//Then it calls checkStatus in order to visually change popup.html