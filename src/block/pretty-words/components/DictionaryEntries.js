import { Button, SelectControl, LinkControl, Panel, PanelBody, PanelRow } from '@wordpress/components';

const DictionaryEntries = ( { dictionaryInfo } ) => {

	console.log( 'DictionaryEntries: ', dictionaryInfo );
	return (
		<Panel>
			<PanelBody title="More" initialOpen={ true }>
				<PanelRow>
					<div className="current-word">{ 'acclimate' }</div>
					<div className="pronunciation">{ 'dictionaryInfo.hwi.hw' }</div>
					<div className="part-of-speech">{ 'dictionaryInfo.fl' }</div>
					<div className="definition">{ 'dictionaryInfo.shortdef' }</div>
				</PanelRow>
				<PanelRow>
					<div className="current-word">{ 'acclimate' }</div>
					<div className="pronunciation">{ 'dictionaryInfo.hwi.hw' }</div>
					<div className="part-of-speech">{ 'dictionaryInfo.fl' }</div>
					<div className="definition">{ 'dictionaryInfo.shortdef' }</div>
				</PanelRow>
			</PanelBody>
		</Panel>
	);
};

export default DictionaryEntries;
