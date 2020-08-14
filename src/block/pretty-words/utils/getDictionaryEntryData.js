const getDictionaryEntryData = async ( word ) => {

	const response = await fetch( `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${ word }?key=${ moconnorPrettyWordsEditor.dictionaryApiDictionaryComKey }` );

	const json = await response.json();

	return json;

};

export default getDictionaryEntryData;
