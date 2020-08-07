
import { Button, SelectControl } from '@wordpress/components';

const getThesaurusWords = async ( term ) => {
	const words = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${term}?key=${moconnorPrettyWordsEditor.dictionaryApiComKey }` )
		.then( ( response ) => response.json() )
		.then( ( json ) => {
			const arr = [];
			arr.push( ...json[ 0 ].meta.syns[ 0 ] );
			return arr;
		} );

	// set state
	// setThesaurusWords( words );
};

const SynonymSelector = ( props ) => {
	console.log( props );
	return (
		<>

			<SelectControl
				label={ `Choose word to replace: ${ props.originalWord }` }
				options={ [
					{ label: 'Much', value: '100%' },
					{ label: 'Extra', value: '50%' },
					{ label: 'Extreme', value: '25%' },
				] }
			/>
			<Button
				onClick={ () => {
					console.log(
						'synonym selector has been clicked',
						{ props }
					);
					props.newWordSetter( 'much' );

				} }
			>Click me!</Button>
		</>
	);
};

export default SynonymSelector;
