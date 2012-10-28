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
			$('#select-main').hide(); $('#wait-main').show();
			setInterval(function() {
				$('#wait-text').text('Waiting....');
			}, 5000);
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
						startAnimatePartialRight('#', function() {
							$('#sw-video').show();
							document.getElementById('sw-video').play();						
						});
					}, 450);
				});
		} else {
			hideElementsLeft(function() {
				startAnimateMain('#sw-pres', function() {
					//TODO: Make the magic happen		
				});
			});
		}
	});
	
	eventHandler.registerEvent('StartTC', function() {
        if (position) {
			hideElementsRight(function() {
				setInterval(function() {
					startAnimatePartialRight('#hw-pres-right', function() {
						$('#hw-video').show();
						document.getElementById('hw-video').play();
					});
				}, 450);
			});
		} else {
			hideElementsLeft(function() {
				startAnimateMain('#hw-pres', function() {
					//TODO: Make the magic happen		
				});
			});
		}
	});
	
	eventHandler.registerEvent('StartHCD', function() {
		if (position) {
			hideElementsRight(function() { 
				startAnimateMain('#interf-pres', function() {
					$('#interf-video').show();
					document.getElementById('interf-video').play();
				});
			});
		} else {
			hideElementsLeft(function() {
				setInterval(function() {
					startAnimatePartialLeft('#interf-pres-left', function() {
						//TODO: Make the magic happen					
					});
				}, 450);
			});
		}
	});
	
	eventHandler.registerEvent('StartITM', function() {
		if (position) {
			hideElementsRight(function() { 
				startAnimateMain('#manage-pres', function() {
					$('#manage-video').show();
					document.getElementById('manage-video').play();
				});
			});	
		} else {
			hideElementsLeft(function() { 
				setInterval(function() {
					startAnimatePartialLeft('#manage-pres-left', function() {
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
					startAnimatePartialRight('#network-pres-right', function() {
						$('#network-video').show();
						document.getElementById('network-video').play();
					});
				}, 450);
			});
		} else {
			hideElementsLeft(function() {
				startAnimateMain('#network-pres', function() {
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

function showElementsRight(method) {
	$('#management').show();
	$('#interface').show();
	$('#itopia').show();
	$('#interf').animate({opacity: 1}, 150, 'swing', function() {
		$('#manage').animate({opacity: 1}, 150, 'swing', function() {
			$('#logo').animate({opacity: 1}, 150, 'swing', method);
		});
	});
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

function showElementsLeft(method) {
	$('#software').show();
	$('#hardware').show();
	$('#network').show();
	$('#software').animate({opacity: 1}, 150, 'swing', function() {
		$('#hardware').animate({opacity: 1}, 'swing', function() {
			$('#network').animate({opacity: 1}, 150, 'swing', method);
		});
	});
}

function startAnimateMain(selector, complete) {
	$(selector).show();
	$(selector).animate({top: '5%',
						 left: 0, 
						 width: '100%',
						 height: '90%', 
						 opacity: 1.0}, 400, 'swing', complete);
}

function endAnimateMain(selector, complete) {
	$(selector).animate({top: '45%',
						 left: '45%', 
						 width: '10%',
						 height: '10%', 
						 opacity: 0}, 400, 'swing', complete);
	$(selector).hide();
}

function startAnimatePartialRight(selector, complete) {
	$(selector).show();
	$(selector).animate({width: '100%'}, 400, 'swing', complete);
}

function endAnimatePartialRight(selector, complete) {
	$(selector).animate({width: '0%'}, 400, 'swing', complete);
	$(selector).hide();	
}

function startAnimatePartialLeft(selector, complete) {
	$(selector).show();
	$(selector).animate({width: '100%',
						 left: '0%'}, 400, 'swing', complete);
}

function endAnimatePartialLeft(selector, complete) {
	$(selector).animate({width: '0%',
						 left: '100%'}, 400, 'swing', complete);
	$(selector).hide();
}