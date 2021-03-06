(function(){
  // This part checks for jQuery
  var version = '1.10.2';
  // Checks for prior inclusion and version
  if (window.jQuery === undefined ||
      window.jQuery.fn.jquery < version) {
    // If there isn't an instance of jQuery, create one and append it to the head
    // Else run our bookmarklet!
    var done = false;
    var script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/' + version + '/jquery.min.js';
    script.onload = script.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
              done = true;
              initBookmarklet(window.jQuery);
      } else {
        console.log('error loading');
      }
    };
    document.getElementsByTagName('head')[0].appendChild(script);
    if (window.jQuery === undefined || window.jQuery.fn.jquery < version) {
      console.log(':::');
    } else {
      console.log('jquery loaded');
    }
  } else {
    initBookmarklet(window.jQuery);
  }

  function initBookmarklet($) {
    (window.bookmarklet = function() {

      $('body').css({'cursor': 'none'});

      // Create jumbotron and apply style
      var jumbotron = '<div id=\'jumbotron\'></div>';
      var jumbotronStyle = {
        'border': '1px solid white',
        'z-index': '1000000000',
        'background-color': 'black',
        'position': 'fixed',
        'bottom': '6px',
        'left': '6px',
        'width': 'calc(100vw / 6)',
        'height': 'calc(100vh / 6)'
      }
      $('body').append(jumbotron);
      $('#jumbotron').css(jumbotronStyle);

      // Create jumbotron cursor and apply style
      var tinyCursor = '<div id=\'tinyCursor\'></div>';
      var tinyCursorStyle = {
        'position': 'fixed',
        'width': '4px',
        'height': '4px',
        'background-color': 'white',
        'border-radius': '50%',
        'left': '4px',
        'bottom': '4px',
        'z-index': '1000000000000'
      };
      $('body').append(tinyCursor);
      $('#tinyCursor').css(tinyCursorStyle);

      // Adjust tinyCursor when mouse moves
      onmousemove = function(e) {
        // console.log('mouse location:', e.clientX, e.clientY)
        $('#tinyCursor').css({
          'left': String((e.clientX / 6) + 6) + 'px',
          'bottom': String((($(window).height() - e.clientY) / 6) + 6) + 'px'
        });
      };
    })();
  }
})();
