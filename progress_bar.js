function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$(function () {
  $('.session-progress').each(function () {
    var $bar = $(this);
    var bar_progress = 0;

    var $session = $bar.closest('.session');
    var $session_full;
    var $session_info;

    if ($session.length > 0) {
      $session_full = $session.find('.session_full');
      $session_info = $session.find('.session_info');
    } else {
      $session = $bar.closest('#current-session');
      $session_full = $session.find('.session_full');
    }

    // Random duration between 5 and 15 seconds
    var totalDuration = randomIntFromInterval(5000, 15000);
    var incrementInterval = 100; 

    var incrementAmount = (100 / (totalDuration / incrementInterval));

    var interval = setInterval(function () {
      bar_progress += incrementAmount;

      if (bar_progress >= 100) {
        bar_progress = 100;
        clearInterval(interval);
      }

      // Update the progress bar width
      $bar.css("width", bar_progress + "%");
      $bar.attr("aria-valuenow", bar_progress.toFixed(0));

      if (bar_progress === 100) {
        $bar.one('transitionend', function (event) {
          if (event.originalEvent.propertyName === 'width') {
            // Display the 'Full' indicator
            $session_full.css('display', 'flex');

            // Fade the session info
            if ($session_info && $session_info.length > 0) {
              $session_info.addClass('full');
            }
          }
        });
      }
    }, incrementInterval);
  });
});