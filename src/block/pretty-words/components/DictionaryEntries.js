import { Panel, PanelBody } from '@wordpress/components';
import SingleDictionaryEntry from './SingleDictionaryEntry';

const DictionaryEntries = ( { dictionaryInfo } ) => {

	console.log( 'DictionaryEntries: ', dictionaryInfo );
	return (
		<Panel>
			<PanelBody title="More" initialOpen={ true }>
				<SingleDictionaryEntry />
				<SingleDictionaryEntry />
			</PanelBody>
		</Panel>
	);
};

export default DictionaryEntries;
