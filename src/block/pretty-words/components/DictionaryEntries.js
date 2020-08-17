import { Panel, PanelBody } from '@wordpress/components';
import SingleDictionaryEntry from './SingleDictionaryEntry';

const DictionaryEntries = ( props ) => {
	const { dictionaryInfo, replacementWord } = props;
	console.log( props );
	return (
		<Panel>
			<PanelBody title="More" initialOpen={ true }>
				{
					dictionaryInfo.map( ( entry ) =>
						<SingleDictionaryEntry
							currentWord={ replacementWord }
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
