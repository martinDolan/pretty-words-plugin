/**
 * EDIT: moconnor Pretty Words
 */
import { RichText, RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { useState } from '@wordpress/element';
import { Button, Modal } from '@wordpress/components';
import icon from './icon';

const { Fragment } = wp.element;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { PanelBody, PanelRow } = wp.components;

const Edit = ( props ) => {

	const {
		attributes: {
			content,
			availableWords,
		},
		className,
		setAttributes,
	} = props;

	const [ thesaurusWords, setThesaurusWords ] = useState( [] );

	const changeThisWord = ( props ) => {

		const fullString = props.value.text;
		const startChar = props.value.start;
		const endChar = props.value.end;
		const stringLen = endChar - startChar;

		const selectedWord = fullString.substr( startChar, stringLen );

		getThesaurusWords( selectedWord );

		const newFormat = {
			...props.value, // original formats object.
			end: props.value.end - 1,
		};

		props.onChange( toggleFormat(
			newFormat,
			{ type: 'my-custom-format/thesaurus-button' }
		) );
	};

	const getThesaurusWords = async ( term ) => {
		const words = await fetch( `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${ term }?key=daf2b265-1b1c-47d7-abc9-947948a68aab` )
			.then( ( response ) => response.json() )
			.then( ( json ) => {
				const arr = [];
				arr.push( ...json[ 0 ].meta.syns[ 0 ] );
				return arr;
			} );

		// set state
		setThesaurusWords( words );
	};

	console.log( thesaurusWords );

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

	// registerPlugin("thesaurus-moc", [
	// 	icon,
	// 	render: menu
	// ])

	return (
		<div></div>
	);
};

export default Edit;
