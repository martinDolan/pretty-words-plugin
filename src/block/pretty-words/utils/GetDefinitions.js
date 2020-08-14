const GetDefinitions = () => {
	console.log( 'getting definitions' );
import { Button, SelectControl, LinkControl, Panel, PanelBody, PanelRow } from '@wordpress/components';

const GetDefinitions = ( props ) => {

	const { replacementWord } = props;

	const response = fetch( `https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=${ moconnorPrettyWordsEditor.dictionaryApiDictionaryComKey }` );

	response.then( ( response ) => response.json() )
		.then( ( data ) => console.log( data[ 0 ] ) );
	console.log( 'GetDefinitions' );
	return (
		<Panel >
			<PanelBody title="More" initialOpen={ true }>
				<PanelRow>
					<div className="current-word">{ replacementWord }</div>
					<div className="pronunciation">[ak-luh-meyt, uh-klahy-mit]</div>
					<div className="part-of-speech">verb</div>
					<div className="definition">to accustom or become accustomed to a new climate or environment; adapt.</div>
				</PanelRow>
			</PanelBody>
		</Panel>
	);

};

export default GetDefinitions;
