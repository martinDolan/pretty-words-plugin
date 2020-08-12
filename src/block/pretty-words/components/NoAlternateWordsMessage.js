const NoAlternateWordsMessage = () => {
const { Notice } = wp.components;
	return (
		<div>Sorry, no alternate words are available for this selection.</div>
		<Notice
			status="error"
		>Sorry, no alternate words are available for this selection.</Notice>
	);
};

export default NoAlternateWordsMessage;
