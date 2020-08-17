import { PanelRow } from '@wordpress/components';

const SingleDictionaryEntry = () => {
	return (
		<PanelRow>
			<div className="current-word">{ 'acclimate' }</div>
			<div className="pronunciation">{ 'dictionaryInfo.hwi.hw' }</div>
			<div className="part-of-speech">{ 'dictionaryInfo.fl' }</div>
			<div className="definition">{ 'dictionaryInfo.shortdef' }</div>
		</PanelRow>
	);
};

export default SingleDictionaryEntry;
