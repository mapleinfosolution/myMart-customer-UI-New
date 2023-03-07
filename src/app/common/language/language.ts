import { getSelectedLang } from './select-language';
let language:any = {
	en : {
        // Header page //
		cart: "cart",

		// Home Page //
		popularCategories: "Popular Categories",
	},
	ar : {
        // Header page //
		cart: "عربة التسوق",

		// Home Page //
		popularCategories: "الفئات الشعبية",
	}
	
}


/**
* Get error or success msg
* @param (string) name
* @return (string)
*/
export function getLanguage(name:any) {
	let selectLang = getSelectedLang();
	return language[selectLang][name];
}