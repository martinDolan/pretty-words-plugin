
import { Button, SelectControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import getChoices from '../utils/getChoices';

const SynonymSelector = withState( {
	choices: [],
	replacementWord: '',
} )( ( props ) => {

	useEffect( () => {

		const { originalWord } = props;

		getChoices( originalWord )
			.then(
				( wordChoices ) => {
					setState( {
						choices: wordChoices,
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
	} = props;

	return (
		<>

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
				onClick={ () => {
					console.log(
						'synonym selector has been clicked',
						{ props }
					);

					newWordSetter( replacementWord );

				} }
			>
				Click me!
			</Button>

		</>
	);
} );

export default SynonymSelector;
