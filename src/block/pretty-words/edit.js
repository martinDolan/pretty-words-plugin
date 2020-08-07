/**
 * EDIT: moconnor Pretty Words
 */
import { RichText, RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { useState } from '@wordpress/element';
import { Button, Modal, Popover } from '@wordpress/components';
import icon from './icon';
import SynonymSelector from './components/SynonymSelector';

const { Fragment } = wp.element;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { PanelBody, PanelRow } = wp.components;
const { registerStore, select, dispatch, withSelect } = wp.data;
const { compose, withState } = wp.compose;

const openMyModal = ( props ) => {
	console.log( props );
	console.log( 'fired' );
	dispatch( 'marty/modal' ).openModal();
};

// console.log( test );

const MyModal = () => {

	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<>
			<Button isSecondary onClick={ openModal }>Open Modal</Button>
			{ isOpen && (
				<Modal
					title="This is my modal"
					onRequestClose={ closeModal }>
					<Button isSecondary onClick={ closeModal }>
						My custom close button
					</Button>
				</Modal>
			) }
		</>
	);
};

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
	isChoosingSynonym: true,
} )( ( props ) => {

	const {
		setState,
		isActive,
		isChoosingSynonym,
	} = props;

	return (
		<>
			<RichTextToolbarButton
				icon="editor-code"
				title="Change This"
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
					originalWord={ 'very' }
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
		<div><MyModal /></div>
	);
};

export default Edit;
