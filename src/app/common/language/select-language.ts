 
let selLanguage:any = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'en';
	
export function getSelectedLang() {
	return selLanguage;
}

export function setSelectedLang(val:any) {
	selLanguage = val;
}

