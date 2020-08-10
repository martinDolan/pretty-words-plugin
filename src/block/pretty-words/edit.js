/**
 * EDIT: moconnor Pretty Words
 */
import { RichText, RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { useState } from '@wordpress/element';
import { Popover } from '@wordpress/components';
import SynonymSelector from './components/SynonymSelector';

const { Fragment } = wp.element;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { PanelBody, PanelRow } = wp.components;
const { registerStore, select, dispatch, withSelect } = wp.data;
const { compose, withState } = wp.compose;

// const [ thesaurusWords, setThesaurusWords ] = useState( [] );

const changeThisWord = ( props ) => {

	// console.log( props );
	// const fullString = props.value.text;
	// const startChar = props.value.start;
	// const endChar = props.value.end;
	// const stringLen = endChar - startChar;

	// const selectedWord = fullString.substr( startChar, stringLen );
	// console.log( selectedWord );

	// getThesaurusWords( selectedWord );

	// const newFormat = {
	// 	...props.value, // original formats object.
	// 	// end: props.value.end - 1,
	// 	end: endChar,
	// };

	// props.onChange( toggleFormat(
	// 	newFormat,
	// 	{ type: 'my-custom-format/thesaurus-button' }
	// ) );
};

const MyCustomButton = withState( {
	isChoosingSynonym: false,
} )( ( props ) => {

	const {
		setState,
		isActive,
		isChoosingSynonym,
	} = props;

	const setOriginalWord = ( props ) => {
		const fullString = props.value.text;
		const startChar = props.value.start;
		const endChar = props.value.end;
		const stringLen = endChar - startChar;
		const selectedWord = fullString.substr( startChar, stringLen );

		// const newFormat = {
		// 	...props.value, // original formats object.
		// 	end: endChar,
		// };

		// props.onChange( toggleFormat(
		// 	newFormat,
		// 	{ type: 'my-custom-format/thesaurus-button' }
		// ) );
		// console.log( props );

		return selectedWord;
	};

	const switchWord = ( symbol ) => {
		console.log( { props } );
		const { start, end, text, formats } = props.value;

		// Insert symbol ticker after the selected text.
		const newContent = `${ text.substring( 0, start ) }${ symbol }${ text.substring( end ) }`;

		// Insert new format after selected text.
		const updatedFormats = [].concat(
			formats.slice( 0, start ), // Elements before insertion.
			[ ...Array( symbol.length ) ].map( () => [] ), // New elements (each is an empty array).
			formats.slice( end ), // Elements after insertion.
		);

		// Properties are offset according to ticker insertion position.
		const newFormat = {
			...props.value,
			formats: updatedFormats,
			text: newContent,
			end: parseInt( start + symbol.length ),
		};

		props.onChange( toggleFormat(
			newFormat,
			{ type: 'my-custom-format/thesaurus-button' }
		) );

		// console.log( newFormat );

		//set new format
		// return newFormat;
	};

	return (
		<>
			<RichTextToolbarButton
				icon="welcome-learn-more"
				title="Use a Better Word"
				onClick={ () => {
					setState( {
						isChoosingSynonym: true,
					} );
				} }
				isActive={ isActive }
			/>
			{ isChoosingSynonym && ( <Popover
				onFocusOutside={ () => {
					setState( {
						isChoosingSynonym: false,
					} );
				} }
			>
				<SynonymSelector
					originalWord={ setOriginalWord( props ) }
					newWordSetter={ ( newWord ) => {
						console.log( `Setting newWord to: ${ newWord }` );
						switchWord( newWord );
						setState( {
							isChoosingSynonym: false,
						} );
					} }
				/>
			</Popover> ) }
		</>
	);
} );

registerFormatType(
	'my-custom-format/thesaurus-button', {
		title: 'Change This',
		tagName: 'thesaurus',
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

	// registerPlugin("thesaurus-moc", [
	// 	icon,
	// 	render: menu
	// ])

	return (
		<div></div>
	);
};

export default Edit;
