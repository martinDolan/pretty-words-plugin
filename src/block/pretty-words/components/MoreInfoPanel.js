import { Button, SelectControl, LinkControl, Panel, PanelBody, PanelRow } from '@wordpress/components';
import GetDefinitions from '../utils/GetDefinitions';

const MoreInfoPanel = ( props ) => {

	const { replacementWord } = props;

	return ( <div>
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
	</div>
	);

};

export default MoreInfoPanel;
