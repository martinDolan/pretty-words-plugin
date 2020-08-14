import DictionaryEntry from './DictionaryEntry';
import getDictionaryEntryData from '../utils/getDictionaryEntryData';

import { withState } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

const MoreInfoPanel = withState( {
	dictionaryInfo: null,
} )( ( props ) => {

	const {
		dictionaryInfo,
		replacementWord,
		setState,
	} = props;

	useEffect( () => {

		const { replacementWord } = props;
		console.log( props );

		if ( ! replacementWord ) {
			return;
		}

		getDictionaryEntryData( replacementWord );
		setState( {
			dictionaryInfo: {},
		} );
	}, [ replacementWord ] );

	let output;

	if ( ! dictionaryInfo ) {
		output = 'loading';
	} else {
		output = <DictionaryEntry />;
	}

	return (
		<>
			{ output }

		</>
	);

} );

export default MoreInfoPanel;
