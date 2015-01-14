function changeStatus(){
  if (enabled==true){
    enabled = false;
    checkStatus();
  }
  else if(enabled==false) {
    enabled = true;
    document.getElementById("Status").innerHTML="Disabled";
    checkStatus();
  }
}