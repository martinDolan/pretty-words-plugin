import DictionaryEntries from './DictionaryEntries';
import getDictionaryEntryData from '../utils/getDictionaryEntryData';

import { withState } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

const MoreInfoPanel = withState( {
	dictionaryInfo: [],
} )( ( props ) => {

	const {
		dictionaryInfo,
		replacementWord,
		setState,
	} = props;

	useEffect( () => {

		if ( ! replacementWord ) {
			return;
		}

		getDictionaryEntryData( replacementWord )
			.then(
				( dictionaryInfo ) => {
					setState( {
						dictionaryInfo,
					} );
				}
			);
	}, [ replacementWord ] );

	let output;

	if ( 0 === dictionaryInfo.length ) {
		output = 'loading';
	} else {
		output = <DictionaryEntries
			dictionaryInfo={ dictionaryInfo }
		/>;
	}

	return (
		<>
			{ output }

		</>
	);

} );

export default MoreInfoPanel;
