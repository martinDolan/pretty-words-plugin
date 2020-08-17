import { Panel, PanelBody } from '@wordpress/components';
import SingleDictionaryEntry from './SingleDictionaryEntry';

const DictionaryEntries = ( { dictionaryInfo } ) => {

	console.log( 'DictionaryEntries: ', dictionaryInfo );
	return (
		<Panel>
			<PanelBody title="More" initialOpen={ true }>
				{
					dictionaryInfo.map( ( entry ) =>
						<SingleDictionaryEntry
							currentWord={ 'current word' }
							definition={ entry.shortdef }
							key={ entry.meta.uuid }
							partOfSpeech={ entry.fl }
							pronunciation={ entry.hwi.hw }
						/>
					)
				}

			</PanelBody>
		</Panel>
	);
};

export default DictionaryEntries;
