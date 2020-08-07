const getChoices = async ( originalWord ) => {

	const response = await fetch( `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${ originalWord }?key=${moconnorPrettyWordsEditor.dictionaryApiComKey }` );
	const json = await response.json();

	return json[ 0 ].meta.syns[ 0 ].map(
		( word ) => {
			return { label: word, value: word };
		}
	);

};

export default getChoices;
