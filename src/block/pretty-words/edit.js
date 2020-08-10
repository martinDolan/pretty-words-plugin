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

		return selectedWord;
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
