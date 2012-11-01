﻿function EventHandler(sessionToken) {
    this.registeredEvents = new Array();
    var sessToken = sessionToken;
    this.registerEvent = function (name, e) {
        this.registeredEvents.push(new keyValuePair(name, e));
    };
    this.startListener = function () { doConnect(this, sessToken); }
    this.setSessionToken = function (token) { sessToken = token; }

    this.getAvailableSessions = function () {
        var req = new XMLHttpRequest();
        req.open('GET', 'event/getsessions', false); req.send();
        var response = req.responseText;
        if (response !== '[]') {
            return JSON.parse(response);
        } else {
            return null;
        }
    };

    function keyValuePair(key, value) {
        this.key = key;
        this.value = value;
    };
    function tokenResult(leftRight, token) {
        this.leftRight = leftRight;
        this.token = token;
    };
};

//Async functions
function doConnect(instance, token) {
    var eSource = new EventSource('event/hook/?token=' + token);

    eSource.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (data.Data == 'true') {
            for (e in instance.registeredEvents) {
                e = instance.registeredEvents[e];
                if (e.key == data.Event) {
                    e.value();
                }
            }
        }
    }

    eSource.onerror = function () { doConnect(instance, token); }
}