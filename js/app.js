$(document).ready(function() {
  $('#goup').click(function(e) {
    e.preventDefault();
    window.scrollTo(0,0);
  });

  var packVisible=[];
  filterPack();

  // change source of symbols
  $(".filter-switch").click(function(e) {
    $(this).children('i').toggleClass('fa-check-square-o');
    $(this).children('i').toggleClass('fa-square-o');
    $(this).toggleClass('badge-info');
    $(this).toggleClass('badge-danger');

    filterPack();
    refreshList();
  });


  // number of list result
  $('#number-of-symbols').append(symbols.length);

  // build list
  $symbols = $('#symbols');

  for(var i=0; i < symbols.length; i++) {
    var symbol = symbols[i];
    var tooltip = 'data-toggle="tooltip" data-placement="top" title="'+symbol.name+'"';
    var $symbol = $('<div class="symbol pack-'+symbol.pack+'" keyword="'+symbol.keyword+'" id="'+i+'" '+tooltip+'>'+symbol.code+'</div>');
    $symbols.append($symbol);
  }

  filterPack();
  refreshList();

  // autosize symbols
  //$('.autofill2').textfill({ });

  $('#search').on('input', refreshList);

  // filter pack of the symbols
  function filterPack() {
    packVisible=[];

    if ($('#filter-font-awesome').hasClass("badge-info")) {
      packVisible.push('.pack-font-awesome');
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
        if ($(this).is(packVisible.join())) {
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

  // open showSymbol modal window
  $('.symbol').click(function(e) {
    e.preventDefault();

    // load data of symbol
    var symbol = symbols[$(this).attr('id')]

    // refresh modal from data
    $('#symbol-html').html(symbol.code);

    $('#symbol-pack-link').attr('href', symbol.packLink);
    $('#symbol-pack-name').html(symbol.pack);

    $('#symbol-link').attr('href', symbol.link);
    $('#symbol-name').html(symbol.name);

    $('#symbol-code').text(symbol.code);
    $('#symbol-unicode').text(symbol.unicode);

    $('#symbol-keyword').text(symbol.keyword);

    // warning message show only brand icons
    if (inArray(symbol.id, symbols_fontawesome_brand_icons)) {
      $('#alert-font-awesome').show();
    } else {
      $('#alert-font-awesome').hide();
    }

    $('#infoSymbol').modal();
  })


  function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
  }

  $('[data-toggle="tooltip"]').tooltip()

  new Clipboard('.btn');
});