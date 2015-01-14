function checkStatus(){
  if (enabled===true){
    $(".status").html("Enabled");
    $(".statusContainer").css("background-color", "rgb(24, 150, 71)");
    $(".powerButton").attr("src","images/enabled.png");
    //$(".question").html("Always view" + domainName + "with DRC");
    $(".questionContainer").show("fast");
  }
  else if (enabled===false){
    $(".status").html("Disabled");
    $(".statusContainer").css("background-color", "rgb(102, 102, 102)");
    $(".powerButton").attr("src","images/disabled.png");
    $(".question").html("");
    $(".questionContainer").hide("fast");
  }
}
