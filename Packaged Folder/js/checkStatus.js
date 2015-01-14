function changeStatus(){
  if (enabled==true){
    document.getElementById("status").innerHTML="Enabled";
    document.getElementById("statusContainer").background-color="rgb(166, 59, 59)";
  else
    document.getElementById("status").innerHTML="Disabled";
    document.getElementById("statusContainer").background-color="rgb(55, 98, 57)";
  }
}



/*
rgb(166, 59, 59) background color for status: on
rgb(55, 98, 57) background color for status: off


*/