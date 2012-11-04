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
                    eventHandler.setSessionToken($('#session').val());
                    eventHandler.startListener();
                    $('#wait-text').text('Waiting....');
                    position = $('#right-screen').is(':checked');
                } catch (e) {
                    $('#wait-text').text('Error Occurred!');
                    $('#wait-img').attr('src', 'Content/img/error.png');
                }
            });
        } else {
            alert('No screen position or session has been given, so the client cant start!')
        }

    });

    $('#session').change(function () {
        var tokeninfo = eventHandler.getSession($('#session').val());
        if (tokeninfo == null) {
            $('#token').html('none');
            $('#right-taken').html('none');
            $('#left-taken').html('none');
        } else {
            $('#token').html(tokeninfo.Token);
            $('#right-taken').html(tokeninfo.RightFilled.toString());
            $('#left-taken').html(tokeninfo.LeftFilled.toString());
        }
    });
	
    eventHandler.registerEvent('onStartLoop', function () {
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
                if (position) {
                    $('#main-right').show();
                } else {
                    $('#main-left').show();
                }
            });
        }
    });
	
    eventHandler.registerEvent('onExitLoop', function () {
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
	
    eventHandler.registerEvent('onStartSE', function () {
        if (position) {
            hideElementsRight(function () {
                setTimeout(function () {
                    startAnimatePartialRight('#sw-pres-right', function () {
                        $('#sw-video').show();
                        document.getElementById('sw-video').play();
                        setTimeout(function () {
                            endAnimatePartialRight('#sw-pres-right', function () {
                                showElementsRight(function () { return null });
                            });
                        }, 30000);
                    });
                }, 450);
            });
        } else {
            hideElementsLeft(function () {
                startAnimateMain('#sw-pres', function () {
                    setTimeout(function () {
                        endAnimateMain('#sw-pres', function () {
                            showElementsLeft(function () { return null });
                        });
                    }, 30000);
                });
            });
        }
    });
	
    eventHandler.registerEvent('onStartTC', function () {
        if (position) {
            hideElementsRight(function () {
                setTimeout(function () {
                    startAnimatePartialRight('#hw-pres-right', function () {
                        $('#hw-video').show();
                        document.getElementById('hw-video').play();
                        setTimeout(function () {
                            endAnimatePartialRight('#hw-pres-right', function () {
                                showElementsRight(function () { return null });
                            });
                        }, 30000);
                    });
                }, 450);
            });
        } else {
            hideElementsLeft(function () {
                startAnimateMain('#hw-pres', function () {
                    setTimeout(function () {
                        endAnimateMain('#hw-pres', function () {
                            showElementsLeft(function () { return null });
                        });
                    }, 30000);
                });
            });
        }
    });
	
    eventHandler.registerEvent('onStartHCD', function () {
        if (position) {
            hideElementsRight(function () {
                startAnimateMain('#interf-pres', function () {
                    $('#interf-video').show();
                    document.getElementById('interf-video').play();
                    setTimeout(function () {
                        endAnimateMain('#interf-pres', function () {
                            showElementsRight(function () { return null });
                        });
                    }, 30000);
                });
            });
        } else {
            hideElementsLeft(function () {
                setTimeout(function () {
                    startAnimatePartialLeft('#interf-pres-left', function () {
                        setTimeout(function () {
                            endAnimatePartialLeft('#interf-pres-left', function () {
                                showElementsLeft(function () { return null });
                            });
                        }, 30000);
                    });
                }, 450);
            });
        }
    });
	
    eventHandler.registerEvent('onStartITM', function () {
        if (position) {
            hideElementsRight(function () {
                startAnimateMain('#manage-pres', function () {
                    $('#manage-video').show();
                    document.getElementById('manage-video').play();
                    setTimeout(function () {
                        endAnimateMain('#manage-pres', function () {
                            showElementsRight(function () { return null });
                        });
                    }, 30000);
                });
            });
        } else {
            hideElementsLeft(function () {
                setTimeout(function () {
                    startAnimatePartialLeft('#manage-pres-left', function () {
                        setTimeout(function () {
                            endAnimatePartialLeft('#manage-pres-left', function () {
                                showElementsLeft(function () { return null });
                            });
                        }, 30000);
                    });
                }, 450);
            });
        }
    });
	
    eventHandler.registerEvent('onStartSNE', function () {
        if (position) {
            hideElementsRight(function () {
                setTimeout(function () {
                    startAnimatePartialRight('#network-pres-right', function () {
                        $('#network-video').show();
                        document.getElementById('network-video').play();
                        setTimeout(function () {
                            endAnimatePartialRight('#network-pres-right', function () {
                                showElementsRight(function () { return null });
                            });
                        }, 30000);
                    });
                }, 450);
            });
        } else {
            hideElementsLeft(function () {
                startAnimateMain('#network-pres', function () {
                    setTimeout(function () {
                        endAnimateMain('#network-pres', function () {
                            showElementsLeft(function () { return null });
                        });
                    }, 30000);
                });
            });
        }
    });

    $('#session').children().filter('[value|=""]').each(function(i, value) { value.outerHTML = '' });
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
    setTimeout(method, 550);
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
    setTimeout(method, 550);
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
    }, 400, 'swing', function () {
        $(selector.replace('-left', '').replace('-right', '') + '-content').animate({ opacity: 1 }, 150, 'swing', complete);
    });
}

function endAnimateMain(selector, complete) {
    setTimeout(function () {
        $(selector.replace('-left', '').replace('-right', '') + '-content').animate({ opacity: 0 }, 150, 'swing', function () {
            $(selector).animate({
                top: '45%',
                left: '45%',
                width: '10%',
                height: '10%',
                opacity: 0
            }, 400, 'swing', function () {
                $(selector).hide();
                $(selector.replace('-left', '').replace('-right', '') + '-content').hide();
                complete();
            });
        });
    }, 450);
}

function startAnimatePartialRight(selector, complete) {
    $(selector).show();
    $(selector).animate({ width: '100%' }, 400, 'swing', function () {
        $(selector.replace('-left', '').replace('-right', '') + '-content').animate({ opacity: 1 }, 150, 'swing', complete);
    });
}

function endAnimatePartialRight(selector, complete) {
    $(selector.replace('-left', '').replace('-right', '') + '-content').animate({ opacity: 0 }, 150, 'swing', function () {
        $(selector).animate({ width: '0%' }, 400, 'swing', function () {
            $(selector).hide();
            $(selector.replace('-left', '').replace('-right', '') + '-content').hide();
            complete();
        });
    });
}

function startAnimatePartialLeft(selector, complete) {
    $(selector).show();
    $(selector).animate({
        width: '100%',
        left: '0%'
    }, 400, 'swing', function () {
        $(selector.replace('-left', '').replace('-right', '') + '-content').animate({ opacity: 1 }, 150, 'swing', complete);
    });
}

function endAnimatePartialLeft(selector, complete) {
    $(selector.replace('-left', '').replace('-right', '') + '-content').animate({ opacity: 0 }, 150, 'swing', function () {
        $(selector).animate({
            width: '0%',
            left: '100%'
        }, 400, 'swing', function () {
            $(selector).hide();
            $(selector.replace('-left', '').replace('-right', '') + '-content').hide();
            complete();
        });
    });
}