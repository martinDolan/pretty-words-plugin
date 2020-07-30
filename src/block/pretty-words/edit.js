/**
 * EDIT: moconnor Pretty Words
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

const changeThisWord = ( props ) => {

	const fullString = props.value.text;
	const startChar = props.value.start;
	const endChar = props.value.end;
	const stringLen = endChar - startChar;

	const selectedWord = fullString.substr( startChar, stringLen );

	getThesaurusWords( selectedWord, props );

	const newFormat = {
		...props.value, // original formats object.
		end: props.value.end - 1,
	};

	props.onChange( toggleFormat(
		newFormat,
		{ type: 'my-custom-format/thesaurus-button' }
	) );
};

const getThesaurusWords = ( term ) => {

	fetch( `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${ term }?key=${ moconnorPrettyWordsEditor.dictionaryApiComKey }` )
		.then( ( response ) => response.json() )
		.then( ( json ) => {
			const arr = [];
			arr.push( ...json[ 0 ].meta.syns[ 0 ] );

		} );
	setAttributes( { availableWords: arr } );
};

const MyCustomButton = ( props ) => {
	return <RichTextToolbarButton
		icon="editor-code"
		title="Change This"
		onClick={ () => {
			changeThisWord( props );
		} }
		isActive={ props.isActive }
	/>;
};

registerFormatType(
	'my-custom-format/thesaurus-button', {
		title: 'Change This',
		tagName: 'thesaurus',
		className: null,
		edit: MyCustomButton,
	}
);

const Edit = ( props ) => {
	console.log( 'edit: ', props );
	const {
		attributes: {
			content,
			availableWords,
		},
		className,
		setAttributes,
	} = props;

	// Update field content on change.
	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } );
	};

	return (
		<div>Hi</div>
	);
};

export default Edit;
