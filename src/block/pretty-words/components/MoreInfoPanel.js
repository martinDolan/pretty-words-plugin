import GetDefinitions from '../utils/GetDefinitions';
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
		output = 'successfully loaded';
	}

	return (
		<>
			{ output }
		</>
	);

} );

export default MoreInfoPanel;
