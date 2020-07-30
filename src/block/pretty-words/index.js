/**
 * REGISTER: moconnor Pretty Words.
 */
import edit from './edit';
import save from './save';

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
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		availableWords: {
			type: 'array',
			default: 'yo',
		},
	},
	edit,
	save,
} );
