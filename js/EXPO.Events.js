﻿function EventHandler(sessionToken) {
    var registeredEvents = new Array();
    this.registerEvent = function (name, e) {
        registeredEvents.push(new keyValuePair(name, e));
    };
    this.startListener = function () {
        var eSource = new EventSource('event/hook/' + sessionToken);
        eSource.onmessage = function (e) {
            var data = JSON.parse(e.data);
            if (data.Data == 'true') {
                for (e in registeredEvents) {
                    e = registeredEvents[e];
                    if (e.key == data.Event) {
                        e.value();
                    }
                }
            }
        };
        eSource.onopen = function () {
            console.log('Connection is open.');
        };
    };
    this.setSessionToken = function (leftRight, token) {
        var req = new XMLHttpRequest();
        req.open('GET', 'event/setsession/' + JSON.stringify(new tokenResult(leftRight, token)), false); req.send();
        if (JSON.parse(req.responseText()).Action == true) {
            sessionToken = token;
            return true;
        } else {
            return false;
        }
    };
    this.getAvailableSessions = function () {
        var req = new XMLHttpRequest();
        req.open('GET', 'event/getsessions', false); req.send();
        return JSON.parse(req.responseText());
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