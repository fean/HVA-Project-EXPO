var eventHandler = new EventHandler('');
var position; var waiting;

$(function() {
	$('#start-pres').click(function() {
        $('#select-window').animate({width: '210px',
									 height: '70px',
									 marginTop: '-35px',
									 marginLeft: '-105px',
									 top: '50%',
									 left: '50%'}
									, 150, 'swing', function() {
		document.getElementById('select-window').innerHTML = '<image src="img/load.gif" class="loader" /><p class="wait">Waiting....</p>';
		});
    });
	
	eventHandler.registerEvent('StartLoop', function() {
		if (!waiting) {
			
		} else {
			$('#select-window').hide();
			$('#select-window-bg').animate({opacity: 0}, 150, 'swing', function() {
				$('#select-window-bg').hide();
			});	
		}
	});
	
	eventHandler.registerEvent('ExitLoop', function() {
		
	});
	
	eventHandler.registerEvent('StartSE', function() {
		if (position) {
				hideElementsRight(function() {
					setInterval(function() {
						animatePartialRight('#', function() {
							$('#sw-video').show();
							document.getElementById('sw-video').play();						
						});
					}, 450);
				});
		} else {
			hideElementsLeft(function() {
				animateMain('#sw-pres', function() {
					//TODO: Make the magic happen		
				});
			});
		}
	});
	
	eventHandler.registerEvent('StartTC', function() {
        if (position) {
			hideElementsRight(function() {
				setInterval(function() {
					animatePartialRight('#hw-pres-right', function() {
						$('#hw-video').show();
						document.getElementById('hw-video').play();
					});
				}, 450);
			});
		} else {
			hideElementsLeft(function() {
				animateMain('#hw-pres', function() {
					//TODO: Make the magic happen		
				});
			});
		}
	});
	
	eventHandler.registerEvent('StartHCD', function() {
		if (position) {
			hideElementsRight(function() { 
				animateMain('#interf-pres', function() {
					$('#interf-video').show();
					document.getElementById('interf-video').play();
				});
			});
		} else {
			hideElementsLeft(function() {
				setInterval(function() {
					animatePartialLeft('#interf-pres-left', function() {
						//TODO: Make the magic happen					
					});
				}, 450);
			});
		}
	});
	
	eventHandler.registerEvent('StartITM', function() {
		if (position) {
			hideElementsRight(function() { 
				animateMain('#manage-pres', function() {
					$('#manage-video').show();
					document.getElementById('manage-video').play();
				});
			});	
		} else {
			hideElementsLeft(function() { 
				setInterval(function() {
					animatePartialLeft('#manage-pres-left', function() {
						//TODO: Make the magic happen
					});
				}, 450);
			});
		}
	});
	
	eventHandler.registerEvent('StartSNE', function() {
		if (position) {
			hideElementsRight(function() {
				setInterval(function() {
					animatePartialRight('#network-pres-right', function() {
						$('#network-video').show();
						document.getElementById('network-video').play();
					});
				}, 450);
			});
		} else {
			hideElementsLeft(function() {
				animateMain('#network-pres', function() {
					//TODO: Make the magic happen			
				});
			});	
		}
	});
	
});

function hideElementsRight(method) {
	$('#logo').animate({opacity: 0}, 150, 'swing', function() {
		$('#manage').animate({opacity: 0}, 150, 'swing', function() {
			$('#interf').animate({opacity: 0}, 150, 'swing', function(){
				$('#management').hide();
				$('#interface').hide();
				$('#itopia').hide();
			});
		});
	});
	setInterval(method, 550);
}

function hideElementsLeft(method) {
	$('#network').animate({opacity: 0}, 150, 'swing', function() {
		$('#hardware').animate({opacity: 0}, 150, 'swing', function() {
			$('#software').animate({opacity: 0}, 150, 'swing', function() {
				$('#software').hide();
				$('#hardware').hide();
				$('#network').hide();	
			});
		});
	});
	setInterval(method, 550);
}

function animateMain(selector, complete) {
	$(selector).show();
	$(selector).animate({top: '5%',
						 left: 0, 
						 width: '100%',
						 height: '90%', 
						 opacity: 1.0}, 400, 'swing', complete);
}

function animatePartialRight(selector, complete) {
	$(selector).show();
	$(selector).animate({width: '100%'}, 400, 'swing', complete);
}

function animatePartialLeft(selector, complete) {
	$(selector).show();
	$(selector).animate({width: '100%',
						 left: '0%'}, 400, 'swing', complete);
}