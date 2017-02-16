
	// generate symbols array
	var symbols = [];

	// import font-awesome symbols
	for (i=0; i < symbols_fontawesome.length; i++) {
		var symbol = symbols_fontawesome[i];

		// same icons group with aliases
		if (false) {
		} else {
			symbol['name'] = symbol.id;
			symbol['pack'] = 'font-awesome';
			symbol['code'] = '<i class="fa fa-'+symbol.id+'"></i>';
			symbol['packLink'] = 'http://fontawesome.io';
			symbol['link'] = 'http://fontawesome.io/icon/'+symbol.id;
			symbols.push(symbol);
		}
	}

	// import material icons
	for (i=0; i < symbols_material.length; i++) {
		var symbol = symbols_material[i];
		symbol['pack'] = 'material';
		symbol['code'] = '<i class="zmdi zmdi-'+symbol.id+'"></i>';
		symbol['packLink'] = 'https://material.io/icons/';
		symbol['link'] = 'https://material.io/icons/#'+symbol.id;
		symbols.push(symbol);
	}