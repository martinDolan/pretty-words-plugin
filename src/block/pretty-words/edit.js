/**
 * EDIT: moconnor Pretty Words
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

const test = apiFetch( { path: '/wp/v2/posts' } ).then( ( posts ) => {
	console.log( posts );
} );

const changeThisWord = ( props ) => {
	console.log( props );

	//This controls how the format is applied.

	console.log( props.value );
	const newFormat = {
		...props.value, // original formats object.
		end: props.value.end - 1,
	};
	console.log( 'newFormat', newFormat );
	props.onChange( toggleFormat(
		newFormat,
		{ type: 'my-custom-format/thesaurus-button' }
	) );
};

const getThesaurusWords = ( term ) => {
	const test = fetch( `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${ term }?key=${ moconnorPrettyWordsEditor.dictionaryApiComKey }` )
		.then( ( response ) => response.json() )
		.then( ( json ) => {

			const arr = [];

			arr.push( ...json[ 0 ].meta.syns[ 0 ] );

			// setAttributes( { availableWords: { arr } } );
			 console.log( arr );
		} );
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

// const MyCustomButton = (props) => {
// 	return <RichTextToolbarButton
// 		icon='editor-code'
// 		title='Sample output'
// 		onClick={() => {
// 			// This controls how the format is applied.
// 			console.log(props.value);
// 			const newFormat = {
// 				...props.value, // original formats object.
// 				end: props.value.end - 1,
// 			};
// 			console.log('newFormat', newFormat);
// 			props.onChange(toggleFormat(
// 				newFormat,
// 				{ type: 'my-custom-format/sample-output' }
// 			));
// 		}}
// 		isActive={props.isActive}
// 	/>;
// };

registerFormatType(
	'my-custom-format/thesaurus-button', {
		title: 'Change This',
		tagName: 'span',
		className: null,
		edit: MyCustomButton,
	}
);

const Edit = ( props ) => {
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
		<button
			onClick={ getThesaurusWords }
		>
			Get Data
		</button>
	);
};

export default Edit;
