
import { Button, SelectControl, LinkControl, Panel, PanelBody, PanelRow, Icon } from '@wordpress/components';
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
				}, ( reason ) => {
					setState( {
						noWordsAvailable: true,
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
		closeAlert,
		originalWord,
	} = props;

	const MoreInfoPanel = () => (
		<Panel >
			<PanelBody title="More" initialOpen={ true }>
				<PanelRow>Short Cuts</PanelRow>
			</PanelBody>
		</Panel>
	);

	let selectControlUi;

	if ( noWordsAvailable ) {
		selectControlUi = <NoAlternateWordsMessage closeAlert={ closeAlert } />;
	} else {
		selectControlUi = (
			<>

				<h3>Choose word to replace <span>{ originalWord }</span></h3>
				<SelectControl
					label={ `Choose word to replace ${ originalWord }` }
					hideLabelFromVision={ true }
					options={ choices }
					onChange={ ( value ) => {
						setState( {
							replacementWord: value,
						} );
					} }
				/>

				<Button
					disabled={ '' === replacementWord }
					isPrimary={ true }
					onClick={ () => {

						newWordSetter( replacementWord );

					} }
				>
					Use This Word
				</Button>
				<MoreInfoPanel />
			</>
		);
	}

	return (
		<>
			{ selectControlUi }
		</>
	);
} );

export default SynonymSelector;
