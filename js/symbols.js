
	// generate symbols array
	var symbols = [];

	// font-awesome symbols
	for (i=0; i < symbols_fontawesome.length; i++) {
		var symbol = symbols_fontawesome[i];
		symbol['name'] = symbol.id;
		symbol['pack'] = 'font-awesome';
		symbol['code'] = '<i class="fa fa-'+symbol.id+'"></i>';
		symbol['packLink'] = 'http://fontawesome.io';
		symbol['link'] = 'http://fontawesome.io/icon/'+symbol.id;
		symbols.push(symbol);
	}