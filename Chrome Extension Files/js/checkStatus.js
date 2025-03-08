function checkStatus() {
	$('.actualButton').each(function () {
		$(this).css({
			'margin-left': ($('.buttonContainer').width() - $(this).width()) / 2
		});
	});
	if (enabled === true) {
		currentStatus = true;
		$(".status").html("Enabled");
		$(".statusContainer").css("background-color", "rgb(24, 150, 71)");
		$(".powerButton").attr("src", "images/enabled.png");
		//$(".questionContainer").show("fast");
		$(".domain").html("on " + window.domain);
	}
	else if (enabled === false) {
		currentStatus = false;
		$(".status").html("Disabled");
		$(".statusContainer").css("background-color", "rgb(102, 102, 102)");
		$(".powerButton").attr("src", "images/disabled.png");
		//$(".questionContainer").hide("fast");
		$(".domain").html("on " + window.domain);
	}

	if ( status == "Enabled") {
		Enabled.checked = true;
	}
	else if ( status == "Disabled") {
		Disabled.checked = true;
	}
	else if ( status == "Neither") {
		Neither.checked = true;
	}

	saveDomainValues();
}

//This basically just checks the values on the popup.html and changes it accordingly.
//It also calls cssInject or cssRemove based on these values.
