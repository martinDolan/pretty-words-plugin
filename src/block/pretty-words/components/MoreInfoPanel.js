import GetDefinitions from '../utils/getDictionaryEntryData';
import DictionaryEntry from './DictionaryEntry';

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
		setState( {
			dictionaryInfo: {},
		} );
	}, [] );

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
