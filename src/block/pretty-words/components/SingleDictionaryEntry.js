import { PanelRow } from '@wordpress/components';

const SingleDictionaryEntry = ( props ) => {

	const {
		currentWord,
		definition,
		partOfSpeech,
		pronunciation,
	} = props;
	return (
		<PanelRow>
			<div className="current-word">{ currentWord }</div>
			<div className="pronunciation">{ pronunciation }</div>
			<div className="part-of-speech">{ partOfSpeech }</div>
			<div className="definition">{ definition }</div>
		</PanelRow>
	);
};

export default SingleDictionaryEntry;
