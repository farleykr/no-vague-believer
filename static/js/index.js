(function() {

    // no promise support (<=IE11)
    if (!('Promise' in window)) {
        return;
    }

    // run fitty first
    fitty('.fit');
    
    // called when all fonts loaded
    function redrawFitty() {
        document.documentElement.classList.add('fonts-loaded');
        fitty.fitAll();
    }

    // CSS Font Loading API 
    function native() {

        // load our custom Harbour font
        var fontHarbour = new FontFace('harbour', 'url(/static/webfonts/3AE7FF_0_0.woff2)', {
        });
        document.fonts.add(fontHarbour);
        fontHarbour.load();

        // if all fonts loaded redraw fitty
        document.fonts.ready.then(redrawFitty);
    }

    // FontFaceObserver
    function fallback() {

        var style = document.createElement('style');
        style.textContent = '@font-face { font-family: harbour; src: url(/static/webfonts3AE7FF_0_0.woff2) format("woff2");}'
        document.head.appendChild(style);

        var s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.0.13/fontfaceobserver.standalone.js';
        s.onload = function() {
        new FontFaceObserver('harbour').load().then(redrawFitty);    
        };
        document.body.appendChild(s);
    }

    // Does the current browser support the CSS Font Loading API?
    if ('fonts' in document) {
        native();
    }
    else {
        fallback();
    }
}());