var eventHandler = new EventHandler('');
var position; var waiting = true;

//Start-up
$(function () {
    $('#start-pres').click(function () {
        if (($('#left-screen').is(':checked') || $('#right-screen').is(':checked')) && $('#session').val() != 'nothing') {
            $('#select-window').animate({
                width: '210px',
                height: '70px',
                marginTop: '-35px',
                marginLeft: '-105px',
                top: '50%',
                left: '50%'
            }, 150, 'swing', function () {
                $('#select-main').hide(); $('#wait-main').show();
                try {
                    eventHandler.startListener(function () {
                        $('#wait-text').text('Waiting....');
                        position = $('#right-screen').is(':checked');
                    });
                } catch (e) {
                    $('#wait-text').text('Error Occurred!');
                    $('#wait-img').attr('src', 'Content/img/error.png');
                }
            });
        } else {
            alert('No screen position or session has been given, so the client cant start!')
        }
    });
	
    eventHandler.registerEvent('StartLoop', function () {
        if (!waiting) {
            if ($('#market-video').attr('data-playing') == 'false') {
                $('#market-video').show().animate({
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    top: 0,
                    left: 0
                }, 200, 'swing', function () {
                    document.getElementById('market-video').play();
                    $('#market-video').attr('data-playing', 'true');
                });
            }
        } else {
            $('#select-window').hide();
            $('#select-window-bg').animate({ opacity: 0 }, 150, 'swing', function () {
                waiting = false;
                $('#select-window-bg').hide();
            });
        }
    });
	
    eventHandler.registerEvent('ExitLoop', function () {
        if (!waiting) {
            if ($('#market-video').attr('data-playing') == 'true') {
                document.getElementById('market-video').pause();
                $('#market-video').animate({
                    top: '45%',
                    left: '45%',
                    width: '10%',
                    height: '10%',
                    opacity: 0
                }, 200, 'swing', function () {
                    $('#market-video').hide();
                });
            }
        }
    });
	
    eventHandler.registerEvent('StartSE', function () {
        if (position) {
            hideElementsRight(function () {
                setInterval(function () {
                    startAnimatePartialRight('#sw-pres-right', function () {
                        $('#sw-video').show();
                        document.getElementById('sw-video').play();
                    });
                }, 450);
            });
        } else {
            hideElementsLeft(function () {
                startAnimateMain('#sw-pres', function () {
                    //TODO: Make the magic happen		
                });
            });
        }
    });
	
    eventHandler.registerEvent('StartTC', function () {
        if (position) {
            hideElementsRight(function () {
                setInterval(function () {
                    startAnimatePartialRight('#hw-pres-right', function () {
                        $('#hw-video').show();
                        document.getElementById('hw-video').play();
                    });
                }, 450);
            });
        } else {
            hideElementsLeft(function () {
                startAnimateMain('#hw-pres', function () {
                    //TODO: Make the magic happen		
                });
            });
        }
    });
	
    eventHandler.registerEvent('StartHCD', function () {
        if (position) {
            hideElementsRight(function () {
                startAnimateMain('#interf-pres', function () {
                    $('#interf-video').show();
                    document.getElementById('interf-video').play();
                });
            });
        } else {
            hideElementsLeft(function () {
                setInterval(function () {
                    startAnimatePartialLeft('#interf-pres-left', function () {
                        //TODO: Make the magic happen					
                    });
                }, 450);
            });
        }
    });
	
    eventHandler.registerEvent('StartITM', function () {
        if (position) {
            hideElementsRight(function () {
                startAnimateMain('#manage-pres', function () {
                    $('#manage-video').show();
                    document.getElementById('manage-video').play();
                });
            });
        } else {
            hideElementsLeft(function () {
                setInterval(function () {
                    startAnimatePartialLeft('#manage-pres-left', function () {
                        //TODO: Make the magic happen
                    });
                }, 450);
            });
        }
    });
	
    eventHandler.registerEvent('StartSNE', function () {
        if (position) {
            hideElementsRight(function () {
                setInterval(function () {
                    startAnimatePartialRight('#network-pres-right', function () {
                        $('#network-video').show();
                        document.getElementById('network-video').play();
                    });
                }, 450);
            });
        } else {
            hideElementsLeft(function () {
                startAnimateMain('#network-pres', function () {
                    //TODO: Make the magic happen			
                });
            });
        }
    });
	doGetSessions();
});

//Visual Engine
function hideElementsRight(method) {
    $('#logo').animate({ opacity: 0 }, 150, 'swing', function () {
        $('#manage').animate({ opacity: 0 }, 150, 'swing', function () {
            $('#interf').animate({ opacity: 0 }, 150, 'swing', function () {
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
    $('#interf').animate({ opacity: 1 }, 150, 'swing', function () {
        $('#manage').animate({ opacity: 1 }, 150, 'swing', function () {
            $('#logo').animate({ opacity: 1 }, 150, 'swing', method);
        });
    });
}

function hideElementsLeft(method) {
    $('#network').animate({ opacity: 0 }, 150, 'swing', function () {
        $('#hardware').animate({ opacity: 0 }, 150, 'swing', function () {
            $('#software').animate({ opacity: 0 }, 150, 'swing', function () {
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
    $('#software').animate({ opacity: 1 }, 150, 'swing', function () {
        $('#hardware').animate({ opacity: 1 }, 'swing', function () {
            $('#network').animate({ opacity: 1 }, 150, 'swing', method);
        });
    });
}

function startAnimateMain(selector, complete) {
    $(selector).show();
    $(selector).animate({
        top: '5%',
        left: 0,
        width: '100%',
        height: '90%',
        opacity: 1.0
    }, 400, 'swing', complete);
}

function endAnimateMain(selector, complete) {
    $(selector).animate({
        top: '45%',
        left: '45%',
        width: '10%',
        height: '10%',
        opacity: 0
    }, 400, 'swing', complete);
    $(selector).hide();
}

function startAnimatePartialRight(selector, complete) {
    $(selector).show();
    $(selector).animate({ width: '100%' }, 400, 'swing', complete);
}

function endAnimatePartialRight(selector, complete) {
    $(selector).animate({ width: '0%' }, 400, 'swing', complete);
    $(selector).hide();
}

function startAnimatePartialLeft(selector, complete) {
    $(selector).show();
    $(selector).animate({
        width: '100%',
        left: '0%'
    }, 400, 'swing', complete);
}

function endAnimatePartialLeft(selector, complete) {
    $(selector).animate({
        width: '0%',
        left: '100%'
    }, 400, 'swing', complete);
    $(selector).hide();
}

//Async functions
function doGetSessions() {
    var sessions = eventHandler.getAvailableSessions();
    if (sessions !== null) {
        for (e in sessions) {
            $('#').append('<option value="' + session[e].Token + '">' + sessions[e].Token + '</option>');
        }
    } else {
        $('#session').append('<option value="nothing">No Sessions</option>');
        setInterval(750, doGetSessions);
    }
}