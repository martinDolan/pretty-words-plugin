
import { Button, SelectControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import getChoices from '../utils/getChoices';
import NoAlternateWordsMessage from './NoAlternateWordsMessage';

const SynonymSelector = withState( {
	choices: [],
	replacementWord: '',
	noWordsAvailable: false,
} )( ( props ) => {

	useEffect( () => {

		const { originalWord } = props;

		getChoices( originalWord )
			.then(
				( wordChoices ) => {
					setState( {
						choices: wordChoices,
						replacementWord: wordChoices[ 0 ].value,
					} );
				}
			);

	}, [] );

	const {
		choices,
		newWordSetter,
		replacementWord,
		setState,
		switchWord,
		noWordsAvailable,
	} = props;

	return (
		<>

				<NoAlternateWordsMessage />
			<SelectControl
				label={ `Choose word to replace: ${ props.originalWord }` }
				options={ choices }
				onChange={ ( value ) => {
					setState( {
						replacementWord: value,
					} );
				} }
			/>

			<Button
				disabled={ '' === replacementWord }
				onClick={ () => {

					newWordSetter( replacementWord );

				} }
			>
				Click me!
			</Button>

		</>
	);
} );

export default SynonymSelector;
