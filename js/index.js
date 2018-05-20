window.sr = ScrollReveal({
  scale: .8
});
$(document).ready( function() {
  var clientHeight = $(window).height();
  $('#parallax').css('height', clientHeight);
  $('.backrow').css('height', clientHeight);
  $('.middlerow').css('height', clientHeight);
  $('.frontrow').css('height', clientHeight);
  /*$('.bottom').css('margin-top', clientHeight);*/

  /*$(window).resize(function() {
    clientHeight = $(window).height();
    $('#parallax').css('height', clientHeight);
    $('.backrow').css('height', clientHeight);
    $('.middlerow').css('height', clientHeight);
    $('.frontrow').css('height', clientHeight);
    console.log(clientHeight);
  });*/

  var clientWidth = $(window).width();
  console.log(clientWidth);

  if (clientWidth >= 880) {
    var divWidth1 = parseFloat($('#tleft').css('width'));
    var divWidth2 = parseFloat($('#bright').css('width'));
    var imgHeight = parseFloat($('#bround1').css('height'));
    $('#tleft').css('width', divWidth1);
    $('#bright').css('width', divWidth2);
    $('#tleft').css('height', imgHeight);
    $('#bright').css('height', imgHeight);
    var imgHeight2 = (imgHeight) / 2;

    $(window).resize(function() {
      var divWidth1 = parseFloat($('#tleft').css('width'));
      var divWidth2 = parseFloat($('#bright').css('width'));
      var imgHeight = parseFloat($('#bround1').css('height'));
      $('#tleft').css('width', divWidth1);
      $('#bright').css('width', divWidth2);
      $('#tleft').css('height', imgHeight);
      $('#bright').css('height', imgHeight);
      var imgHeight2 = (imgHeight) / 2;
    });
  }

  checkRef(Cookies.get('ref'));

  if(Cookies.get('hasSignedUp') !== undefined) {
    $('.signup').hide();
    $('#signup-success').show();
    $('.refBar').hide();
    $('#ambassador').show();
  } else {
    $('#button-signup').html('<button class="signup">Sign Up</button>');
    $('.signup').on('click touchstart', function() {
      $("#referralCode").html("Having trouble signing up? <a href=\"mailto:hello@hackchicago.io\">Email us!</a>");
      toggleSignup();
    });
  }

  if(Cookies.get('ap-name') !== undefined) {
    setAPLink(Cookies.get('ap-name'));
  }
});

function toggleSignup(ref) {
  if (ref)
  $('#signup-frame').attr('src', 'apply.html?ref=' + ref);
  else
  $('#signup-frame').attr('src', 'apply.html');

  $('.splitscreen').toggleClass('show');
  $('.split-overlay').toggleClass('show');
  $('body').toggleClass('noscroll');
  $('body').toggleClass('yieldFocus');
}

//Get Parameter
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkRef(ref) {
  if (ref != null && ref != "" && ref != "null")
  fillRef(ref);
  else {
    Cookies.set('ref', fillRef(getParam("ref")), { expires: 180 })
  }
}

function fillRef(code) {

  if (code != "" && code != null) {
    $("#referralCode").html("Referred by " + code);
    $(".signup").on('click touchstart', 'toggleSignup("'+ code +'")')
  }

  return code;
}

function finishSignupFlow() {

  $('#signup-frame').attr('src', 'apply.html');
  $('.splitscreen').toggleClass('show');
  $('.split-overlay').toggleClass('show');
  $('body').toggleClass('noscroll');
  $('body').toggleClass('yieldFocus');

  $('.signup').hide();
  $('.refBar').hide();
  $('#signup-success').show();

  Cookies.set('hasSignedUp', 'true', { expires: 180 });

}

$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
    &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1200, function() {});
    }
  }
});

$('.splitscreen-close').on('click', function() {
  toggleSignup();
});

$('.generate').on('click', function() {
  if ($('.ap-name').val() != "") {
    Cookies.set("ap-name", setAPLink($('.ap-name').val()), { expires: 180 })
  }
});

$('.ap-reset').on('click', function() {
  resetAP();
});

function setAPLink(n) {
  $('.ap-form').hide();
  $('.ap-result').html("<p>Your unique link: <input class=\"ap-link\" value=\"https://hackchicago.io/?ref=" + n.replace(" ", "+") + "\"><button id=\"copy_button\" class=\"copy-button\"><svg class=\"copy-icon\" viewBox=\"0 0 14 16\" version=\"1.1\" width=\"14\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z\"></path></svg></button></p>");
  $(".copy-button").on("click", function () {
    if (!navigator.clipboard) {
      $(".ap-link").focus();
      $(".ap-link").select();
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'Copied!' : 'Press CTRL + C or CMD + C to copy';
        $(".copy-button-result").text(msg);
      } catch (err) {
        $(".copy-button-result").text('Press CTRL + C or CMD + C to copy');
      }
    } else {
      navigator.clipboard.writeText($('.ap-link').val()).then(function() {
        $(".copy-button-result").text('Copied!');
      }, function(err) {
        $(".copy-button-result").text('Press CTRL + C or CMD + C to copy');
      });
    }
  });
  $(".ap-link").on("click", function () {
    $(this).select();
  });
  $('.ap-link').attr('size', $('.ap-link').val().length);
  $('.ap-name-box').text(n);
  $('.ap-reset-bar').show();
  return n;
}

function resetAP() {
  $('.ap-form').show();
  $('.ap-result').html("");
  $('.ap-reset-bar').hide();
  Cookies.remove("ap-name");
}

sr.reveal('.center', {
  duration: 1500,
  afterReveal: function (domEl) {
    $('#scroll-container').show();
  }
});
sr.reveal('.card');
sr.reveal('.tier');
sr.reveal('.sponsor');
sr.reveal('.partner');
