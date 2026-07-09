function calculate() {
    var lat = parseFloat(document.getElementById("lat").value);
    var lon = parseFloat(document.getElementById("lon").value);

    if (isNaN(lat) || isNaN(lon)) {
        document.getElementById("result").innerText = "Fill in all the fields first";
        return;
    }

    var now = new Date();
    var stateofyear = Date.UTC(now.getUTCFullYear(), 0, 0);
    var currentdate = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    var day = Math.floor((currentdate - stateofyear) / (1000 * 60 * 60 * 24));

    var g = (2 * Math.PI / 365) * (day - 1);
    var d = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g);
    var e = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    var latrad = lat * Math.PI / 180;
    var cosw = (Math.sin(-0.8333 * Math.PI / 180) - Math.sin(latrad) * Math.sin(d)) / (Math.cos(latrad) * Math.cos(d));

    if (cosw < -1 || cosw > 1) {
        document.getElementById("result").innerText = "No sunset for this location/day (polar day or polar night).";
        return;
    }

    var w = Math.acos(cosw) * 180 / Math.PI;
    var noon = 720 - 4 * lon - e;
    var sunsetUtc = noon + 4 * w;

    var tz = tzlookup(lat, lon);
    var formatter = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
    var formatParts = formatter.formatToParts(now);
    var offsetStr = "";
    for (var i = 0; i < formatParts.length; i++) {
        if (formatParts[i].type == "timeZoneName") {
            offsetStr = formatParts[i].value;
        }
    }
    var tzMinutes = 0;
    if (offsetStr != "GMT" && offsetStr != "UTC") {
        var sign = 1;
        var timeStr = "";
        if (offsetStr.includes("-")) {
            sign = -1;
            timeStr = offsetStr.split("-")[1];
        } else {
            timeStr = offsetStr.split("+")[1];
        }
        var timeArray = timeStr.split(":");
        var hours = parseInt(timeArray[0]);
        var mins = 0;
        if (timeArray.length > 1) {
            mins = parseInt(timeArray[1]);
        }
        tzMinutes = sign * (hours * 60 + mins);
    }
    var sunsetLocal = sunsetUtc + tzMinutes;

    var h = Math.floor((sunsetLocal / 60) % 24);
    var m = Math.round(sunsetLocal % 60);

    if (m === 60) {
        m = 0;
        h = (h + 1) % 24;
    }
    if (h < 0) {
        h += 24;
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }

    document.getElementById("result").innerText = "Sunset time: " + h + ":" + m + " (" + tz + ")";
}
