// hide message info
var $infoMsg = $('#info-message');
$infoMsg.hide();

// visible of symbol packs
var packVisible=[];
filterPack();
refreshList();

// change source of symbols
$(".filter-switch").click(function(e) {
  $(this).children('i').toggleClass('fa-check-square-o');
  $(this).children('i').toggleClass('fa-square-o');
  $(this).toggleClass('badge-info');
  $(this).toggleClass('badge-danger');

  filterPack();
  refreshList();
});

// change keyword on input
$('#search').on('input', refreshList);

// filter pack of the symbols
function filterPack() {
  packVisible=[];

  if ($('#filter-font-awesome').hasClass("badge-info")) {
    packVisible.push('.pack-font-awesome');
  }
  if ($('#filter-material').hasClass("badge-info")) {
    packVisible.push('.pack-material');
  }
}

/**
 * refresh visible symbols
 */
function refreshList() {
  var keyword = $('#search_field').val().toLowerCase();
  var number_of_symbols = 0;
  var filterSocial = $('#filter-social-btn').hasClass('badge-info');

  $('.symbol').each(function(index) {
    var $icon = $(this);
    if ($(this).attr('keyword').search(keyword) === -1) {
      $icon.hide();
    } else {
      if ($(this).is(packVisible.join())) {
        // filter social symbols
        if(filterSocial && $icon.hasClass('filter-social') || !filterSocial && !$icon.hasClass('filter-social')) {
          $icon.show();
          number_of_symbols++;
        } else  {
          $icon.hide();
        }
      } else {
        $icon.hide();
      }
    }
  });
  $('#number-of-symbols').text(number_of_symbols);
}

// edit mode: copy or info modal
$('.btn-symbol-mode').click(function() {
  $(this).siblings().removeClass('btn-danger').addClass('btn-info');
  $(this).removeClass('btn-info').addClass('btn-danger');
});

// higligh of symbol-theme buttons
$('.btn-symbol-theme').click(function() {
  $(this).siblings().removeClass('btn-danger').addClass('btn-info');
  $(this).removeClass('btn-info').addClass('btn-danger');
});

// higlight of symbol-size buttons
$('.btn-symbol-size').click(function() {
  $(this).siblings().removeClass('btn-danger').addClass('btn-info');
  $(this).removeClass('btn-info').addClass('btn-danger');
});

// change size of symbols to small
$('#ico-size-small').click(function() {
  $('.symbol').removeClass('symbol-lg').addClass('symbol-sm');
});

// change size of symbols to medium
$('#ico-size-default').click(function() {
  $('.symbol').removeClass('symbol-lg symbol-sm');
});

// change size of symbols to large
$('#ico-size-large').click(function() {
  $('.symbol').removeClass('symbol-sm').addClass('symbol-lg');
});

//  change theme of symbols to light contrast
$('#ico-theme-1').click(function() {
  $('.symbol').removeClass('symbol-theme-2').addClass('symbol-theme-1');
  $('#wrap').removeClass('symbol-theme-2-bg').addClass('symbol-theme-1-bg');
  $('h1.category').removeClass('symbol-theme-2-h1').addClass('symbol-theme-1-h1');
  $('#wrap-symbols').addClass('wrap-symbols-theme');
  $('#wrap-symbols').addClass('wrap-symbols-theme-2').removeClass('wrap-symbols-theme-1');
});

//  change theme of symbols to light
$('#ico-theme-2').click(function() {
  $('.symbol').removeClass('symbol-theme-1').addClass('symbol-theme-2');
  $('#wrap').removeClass('symbol-theme-1-bg').addClass('symbol-theme-2-bg');
  $('h1.category').removeClass('symbol-theme-1-h1').addClass('symbol-theme-2-h1');
  $('#wrap-symbols').addClass('wrap-symbols-theme-1').removeClass('wrap-symbols-theme-2');
});

//  change theme of symbols to default dark
$('#ico-theme-default').click(function() {
  $('.symbol').removeClass('symbol-theme-1 symbol-theme-2');
  $('#wrap').removeClass('symbol-theme-1-bg symbol-theme-2-bg');
  $('h1.category').removeClass('symbol-theme-1-h1 symbol-theme-2-h1');
  $('#wrap-symbols').removeClass('wrap-symbols-theme-1 wrap-symbols-theme-2');
});

// open showSymbol modal window
$('.symbol').click(function(e) {
  e.preventDefault();

  if ($('#mode-copy-html').hasClass('btn-danger')) {
    // copy symbol's html code to the clipboard
    var clipboard = new Clipboard('.symbol', {
      text: function(trigger) {
        return $(trigger).html();
      }
    });
    clipboard.on('success', function(e) {
      $infoMsg.html('<i class="fa fa-exclamation-triangle"></i> HTML source copy to the clipboard succesfully.');
      $infoMsg.fadeIn().delay(1000).fadeOut();
      clipboard.destroy();
    });
  } else if ($('#mode-copy-css').hasClass('btn-danger')) {
    // copy symbol's css code to the clipboard
    var clipboard = new Clipboard('.symbol', {
      text: function(trigger) {
        return $(trigger).attr('unicode');
      }
    });
    clipboard.on('success', function(e) {
      $infoMsg.html('<i class="fa fa-exclamation-triangle"></i> CSS source copy to the clipboard successfully.');
      $infoMsg.fadeIn().delay(1000).fadeOut();
      clipboard.destroy();
    });

  } else {
    // show all information about the selected symbols

    // load data of symbol
    var symbol = symbols[$(this).attr('id')]

    // refresh modal from data
    $('#symbol-html').html(symbol.code);

    // top of the window: symbol pack name and link and symbol name and link
    $('#symbol-pack-link').attr('href', symbol.packLink);
    $('#symbol-pack-name').html(symbol.pack);
    $('#symbol-link').attr('href', symbol.link);
    $('#symbol-name').html(symbol.name);

    // source and unicode text to use symbol
    $('#symbol-code').text(symbol.code);
    $('#symbol-unicode').text(symbol.unicode);

    // keywords to the symbol
    $('#symbol-keyword').text(symbol.keyword);

    // warning message show only brand icons
    $('#alert-font-awesome').hide();
    $('#alert-material').hide();

    // brand icon show extra legal infos
    if (symbol.pack === 'font-awesome' && inArray(symbol.id, symbols_fontawesome_brand_icons)) {
        $('#alert-font-awesome').show();
    } else if(symbol.pack === 'material' && inArray(symbol.id, symbols_material_brand_icons)) {
        $('#alert-material').show();
    }

    // Info Dialog: copy symbol's html code to the clipboard
    var clipboardHtml = new Clipboard('#copy-html-clipboard', {
      text: getSelectedSymbolCode
    });

    // open modal window
    $('#infoSymbol').modal();
  } // end of show info modal mode
});

function getSelectedSymbolCode(trigger) {
  return $('#symbol-code').html();
}

function getSelectedSymbolUnicode(trigger) {
  return $('#symbol-unicode').html();
}

// Info Dialog: copy symbol's html code to the clipboard
var clipboardHtml = new Clipboard('#copy-html-clipboard', {
  text: getSelectedSymbolCode
});

// info dialog: copy symbol's css code to the clipboard
var clipboardCss = new Clipboard('#copy-css-clipboard', {
  text: getSelectedSymbolUnicode
});

// using bootstrap tooltip
$('[data-toggle="tooltip"]').tooltip()

// open terms.html to a modal window
$.get('terms.html', function(data) {
  $('#terms-content').html($('#wrap-terms-inner', data));
});

// open terms modal window
$('#btn-terms').click(function(e) {
  e.preventDefault();
  $('#terms').modal();
});

// show every symbols tooltip with symbol pack and symbol id
$('.symbol').tooltip({
  trigger: 'hover',
  html: true
});

// use clipboard jquery plugin to copy source an unicode info of symbol
// new Clipboard('.btn');
