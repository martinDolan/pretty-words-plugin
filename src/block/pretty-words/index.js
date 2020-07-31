/**
 * REGISTER: moconnor Pretty Words.
 */
import edit from './edit';
import save from './save';
import sidebar from './sidebar';

// import changeThisWord from './edit';
// import getThesaurusWords from './edit';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'moconnor/pretty-words', {
	title: __( 'moconnor Pretty Words', 'pretty-words' ),
	icon: 'edit',
	category: 'common',
	keywords: [
		__( 'moconnor', 'pretty-words' ),
		__( 'PrettyWords', 'pretty-words' ),
	],
	attributes: {
		availableWords: {
			type: 'array',
			default: 'yo',
			content: '',
		},
	},
	sidebar,
	edit,
	save,
} );
