$(document).ready(function() {

  // effect on the header
  var logos = [
    '&#x2600;',
    '<i class="fa fa-moon-o"></i>',
    '<i class="fa fa-users"></i>',
    '&#x260A;',
    '<span class="glyphicon glyphicon-trash"></span>'
  ];

  var idxLogo = 0;
  var maxLogo = logos.length

  function myLogo() {
    $("#logo").html(logos[idxLogo]);
    idxLogo++;
    if (idxLogo == maxLogo) {
      idxLogo = 0;
    }
  }

  $('[data-toggle="tooltip"]').tooltip()
  $('#goup').click(function(e) {
    e.preventDefault();
    window.scrollTo(0,0);
  });

  setInterval(myLogo, 2000);

  var originVisible=[];
  filterOrigin();

  // change source of symbols
  $(".filter-switch").click(function(e) {
    $(this).children('i').toggleClass('fa-check-square-o');
    $(this).children('i').toggleClass('fa-square-o');
    $(this).toggleClass('label-info');
    $(this).toggleClass('label-danger');

    filterOrigin();
    refreshList();
  });


  // number of list result
  $('#number-of-symbols').append(symbols.length);

  // build list
  $symbols = $('#symbols');

  for(var i=0; i < symbols.length; i++) {
    var symbol = symbols[i];
    var $symbol = $('<div class="symbol origin-'+symbol.origin+'" keyword="'+symbol.keyword+'">'+symbol.code+'</div>');
    $symbols.append($symbol);
  }

  filterOrigin();
  refreshList();

  // autosize symbols
  //$('.autofill2').textfill({ });

  $('#search').on('input', refreshList);

  // filter origin of the symbols
  function filterOrigin() {
    originVisible=[];

    if ($('#filter-font-awesome').hasClass("label-info")) {
      originVisible.push('.origin-font-awesome');
    }

    if ($('#filter-glyphicon').hasClass("label-info")) {
      originVisible.push('.origin-glyphicon');
    }
  }

  function refreshList() {
    var keyword = $('#search').val();
    var number_of_symbols = 0;
    $('.symbol').each(function(index) {
      var $icon = $(this);
      if ($(this).attr('keyword').search(keyword) === -1) {
        $icon.hide();
      } else {
        if ($(this).is(originVisible.join())) {
          $icon.show();
          number_of_symbols++;
        } else {
          $icon.hide();
        }
      }
    });
    $('#number-of-symbols').text(number_of_symbols);
  }

  // change size of symbols
  $('#ico-size-small').click(function(e) {
    e.preventDefault();
    $('.symbol').removeClass('symbol-lg').addClass('symbol-sm');
  });

  $('#ico-size-default').click(function(e) {
    e.preventDefault();
    $('.symbol').removeClass('symbol-lg symbol-sm');
  });

  $('#ico-size-large').click(function(e) {
    e.preventDefault();
    $('.symbol').removeClass('symbol-sm').addClass('symbol-lg');
  });

  //  change theme of symbols
  // change size of symbols
  $('#ico-theme-1').click(function(e) {
    e.preventDefault();
    $('.symbol').removeClass('symbol-theme-2').addClass('symbol-theme-1');
    $('#wrap-symbols').addClass('wrap-symbols-theme');
  });

  $('#ico-theme-2').click(function(e) {
    e.preventDefault();
    $('.symbol').removeClass('symbol-theme-1').addClass('symbol-theme-2');
    $('#wrap-symbols').addClass('wrap-symbols-theme');
  });

  $('#ico-theme-default').click(function(e) {
    e.preventDefault();
    $('.symbol').removeClass('symbol-theme-1 symbol-theme-2');
    $('#wrap-symbols').removeClass('wrap-symbols-theme');
  });


  function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
  }
});