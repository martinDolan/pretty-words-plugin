const GetDefinitions = () => {
	console.log( 'getting definitions' );
	const response = fetch( `https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=${ moconnorPrettyWordsEditor.dictionaryApiDictionaryComKey }` );
};

export default GetDefinitions;
