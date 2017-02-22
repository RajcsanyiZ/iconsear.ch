// generate symbols array
var symbols = [];

// import font-awesome symbols
var flagAlias = -1;
for (i=0; i<symbols_fontawesome.length; i++) {
	var symbol = symbols_fontawesome[i];

	// has it an alias?
	for (var j=0; j < symbols.length; j++) {
		if (symbols[j].unicode === symbol.unicode) {
			flagAlias = j;
			break;
		}
	}
	// same icons group with alias
	if (flagAlias === -1) {
		// it is a new symbol
		symbol['name'] = symbol.id;
		symbol['pack'] = 'font-awesome';
		symbol['code'] = '<i class="fa fa-'+symbol.id+'"></i>';
		symbol['packLink'] = 'http://fontawesome.io';
		symbol['link'] = 'http://fontawesome.io/icon/'+symbol.id;
		symbols.push(symbol);
	} else {
		// it is an alias
		symbols[flagAlias].keyword += ', '+ symbol.id;
		flagAlias = -1;

	}
}

// import material icons
for (i=0; i < symbols_material.length; i++) {
	var symbol = symbols_material[i];
	symbol['pack'] = 'material';
	symbol['code'] = '<i class="zmdi zmdi-'+symbol.id+'"></i>';
	symbol['packLink'] = 'http://zavoloklom.github.io/material-design-iconic-font/icons.html';
	symbol['link'] = 'http://zavoloklom.github.io/material-design-iconic-font/icons.html#'+symbol.id;
	symbols.push(symbol);
}


// load symbols into DOM
$symbols = $('#symbols');

var filterTag, symbol, title, unicode;

for(var i=0; i < symbols.length; i++) {
  symbol = symbols[i];
  if (symbol.pack === 'font-awesome') {
    filterSocial = inArray(symbol.id, symbols_fontawesome_brand_icons)?' filter-social':'';
    title = ' title="<h1><i class=\'fa fa-'+symbol.id+'\'></i></h1>Font Awesome<br />'+symbol.id+'"';
    unicode = ' unicode="'+symbol.unicode+'"';
    var $symbol = $('<div class="symbol pack-'+symbol.pack+filterSocial+'" keyword="'+symbol.keyword+'" id="'+i+'"'+title+unicode+'>'+symbol.code+'</div>');
  } else if(symbol.pack === 'material') {
    filterSocial = inArray(symbol.id, symbols_material_brand_icons)?' filter-social':'';
    title = ' title="<h1><i class=\'zmdi zmdi-'+symbol.id+'\'></i></h1>Material Icons<br>'+symbol.id+'"';
    unicode = ' unicode="'+symbol.unicode+'"';
    var $symbol = $('<div class="symbol pack-'+symbol.pack+filterSocial+'" keyword="'+symbol.keyword+'" id="'+i+'"'+title+unicode+'>'+symbol.code+'</div>');
  }
  $symbols.append($symbol);
}

/**
 * has a item on array
 * @param  mixed needle
 * @param array haystack
 * @return boolean
 */
function inArray(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
      if(haystack[i] == needle) return true;
  }
  return false;
}