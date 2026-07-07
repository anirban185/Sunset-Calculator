function calculate() {
    var lat = parseFloat(document.getElementById("lat").value);
    var lon = parseFloat(document.getElementById("lon").value);
    var day = parseFloat(document.getElementById("day").value)

    if (isNaN(lat) || isNaN(lon) || isNaN(day)) {
        alert("Fill in all the fields first")
        return;
    }

    var g = (2 * Math.PI / 365) * (day - 1);
    var d = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.cos(2 * g);
    var e = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    var latrad = lat * Math.PI / 180;
    var cosw = (Math.sin(-0.8333 * pi / 180) - Math.sin(latrad) * Math.sin(d)) / (Math.cos(latrad) * Math.cos(d));
    var w = Math.acos(cosw) * 180 / Math.PI;
    var noon = 720 - 4 * lon - e;
    var sunsetUtc = noon + 4 * w;
    var sunsetlocal = sunsetUtc + ((lon / 15) * 60);
    var h = Math.floor((sunsetLocal / 60) % 24);
    var m = Math.round(sunsetLocal % 60);
    if (m == 60) {
        m = 0;
        h = (h + 1) % 24;
    }
    if (h < 0) {
        h += 24;
    }
    if (h < 0) {
        h = "0" + h;
    }
    if (m < 0) {
        m = "0" + h;
    }
    alert("Sunset time: " + h + ":" + m);
}