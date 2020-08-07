const getChoices = async ( originalWord ) => {

	const choices = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${originalWord}?key=${moconnorPrettyWordsEditor.dictionaryApiComKey }` )
		.then( ( response ) => response.json() )
		.then( ( json ) => {

			const arr = json[ 0 ].meta.syns[ 0 ].map(
				( word ) => {
					return { label: word, value: word };
				}
			);

			return arr;
		} );

	return choices;
};

export default getChoices;
