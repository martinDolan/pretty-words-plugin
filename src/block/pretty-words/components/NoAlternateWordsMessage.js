const { Notice } = wp.components;

const NoAlternateWordsMessage = ( props ) => {

	const { closeAlert } = props;

	return (
		<Notice
			status="error"
			onRemove={ () => {
				closeAlert();
			} }
		>Sorry, no alternate words are available for this selection.</Notice>
	);
};

export default NoAlternateWordsMessage;
