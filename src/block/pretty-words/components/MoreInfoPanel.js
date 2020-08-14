import GetDefinitions from '../utils/GetDefinitions';

const MoreInfoPanel = ( props ) => {

	const { replacementWord } = props;

	return (
		<div>
			<GetDefinitions
				replacementWord={ replacementWord }
			/>
		</div>
	);

};

export default MoreInfoPanel;
