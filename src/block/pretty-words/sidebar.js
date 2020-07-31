import { RichText, RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
const { Fragment } = wp.element;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { PanelBody, PanelRow } = wp.components;
import icon from './icon';

const ThesaurusSidebar = ( props ) => {
	return (
		<Fragment>
			<PluginSidebarMoreMenuItem target="thesaurus-sidebar">
				{ __( 'Pretty Words', 'thesaurus-block' ) }
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				name="thesaurus-sidebar"
				title={ __( 'Pretty Words', 'thesaurus-block' ) }
			>
				<PanelBody>
					<PanelRow>
						{ __( 'Pretty Words', 'thesaurus-block' ) }
					</PanelRow>
				</PanelBody>
			</PluginSidebar>
		</Fragment>
	);
};

registerPlugin( 'thesaurus-sidebar', {
	icon,
	render: ThesaurusSidebar,
} );

export default ThesaurusSidebar;
