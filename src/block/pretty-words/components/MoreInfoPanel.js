import GetDefinitions from '../utils/getDictionaryEntryData';
import DictionaryEntry from './DictionaryEntry';

import { withState } from '@wordpress/compose';

const MoreInfoPanel = withState( {
	dictionaryInfo: null,
} )( ( props ) => {

	const {
		dictionaryInfo,
		replacementWord,
	} = props;

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
