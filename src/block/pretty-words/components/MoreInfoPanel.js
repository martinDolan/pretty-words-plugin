import { Button, SelectControl, LinkControl, Panel, PanelBody, PanelRow } from '@wordpress/components';

const MoreInfoPanel = () => (
	<Panel >
		<PanelBody title="More" initialOpen={ true }>
			<PanelRow>
				<div>Placeholderword</div>
				<div>This is the definition of Placeholderword</div>
			</PanelRow>
		</PanelBody>
	</Panel>
);

export default MoreInfoPanel;
