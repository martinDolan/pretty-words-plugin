
import { Button, SelectControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';

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

const SynonymSelector = withState( {
	replacementWord: '',
} )( ( props ) => {

	const {
		replacementWord,
		setState,
	} = props;

	return (
		<>

			<SelectControl
				label={ `Choose word to replace: ${ props.originalWord }` }
				options={ [
					{ label: 'Much', value: 'Much' },
					{ label: 'Extra', value: 'Extra' },
					{ label: 'Extreme', value: 'Extreme' },
				] }
				onChange={ ( value ) => {
					setState( {
						replacementWord: value,
					} );
				} }
			/>

			<Button
				onClick={ () => {
					console.log(
						'synonym selector has been clicked',
						{ props }
					);
					props.newWordSetter( replacementWord );

				} }
			>
				Click me!
			</Button>

		</>
	);
} );

export default SynonymSelector;
