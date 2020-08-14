<?php
/**
 * Plugin Name:     moconnor Pretty Words
 * Description:     A starter plugin for Gutenberg blocks development.
 * Version:         0.1.0
 * Author:          moconnor
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     pretty-words
 *
 * @package         moconnor\PrettyWords
 */

namespace moconnor\PrettyWords;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Register the block with WordPress.
 *
 * @author moconnor
 * @since 0.0.1
 */
function register_block() {

	// Define our assets.
	$editor_script   = 'build/index.js';
	$editor_style    = 'build/editor.css';
	$frontend_style  = 'build/style.css';
	$frontend_script = 'build/frontend.js';

	// Verify we have an editor script.
	if ( ! file_exists( plugin_dir_path( __FILE__ ) . $editor_script ) ) {
		wp_die( esc_html__( 'Whoops! You need to run `npm run build` for the moconnor Pretty Words first.', 'pretty-words' ) );
	}

	// Autoload dependencies and version.
	$asset_file = require plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	// Register editor script.
	wp_register_script(
		'moconnor-pretty-words-editor-script',
		plugins_url( $editor_script, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register editor style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $editor_style ) ) {
		wp_register_style(
			'moconnor-pretty-words-editor-style',
			plugins_url( $editor_style, __FILE__ ),
			[ 'wp-edit-blocks' ],
			filemtime( plugin_dir_path( __FILE__ ) . $editor_style )
		);
	}

	wp_localize_script(
        // The "handle" of the JS file we enqueue.
        'moconnor-pretty-words-editor-script',

        // A name we makeup to avoid our PHP values colliding with others.
        'moconnorPrettyWordsEditor',

         // A key/value array of values to pass from PHP to JavaScript.
         array(
			'dictionaryApiThesaurusComKey' => constant( 'DICTIONARYAPI_COM_THESAURUS_KEY' ),
			'dictionaryApiDictionaryComKey' => constant( 'DICTIONARYAPI_COM_DICTIONARY_KEY' ),
		)
	);

	// Register frontend style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_style ) ) {
		wp_register_style(
			'moconnor-pretty-words-style',
			plugins_url( $frontend_style, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $frontend_style )
		);
	}

	// Register block with WordPress.
	register_block_type( 'moconnor/pretty-words', array(
		'editor_script' => 'moconnor-pretty-words-editor-script',
		'editor_style'  => 'moconnor-pretty-words-editor-style',
		'style'         => 'moconnor-pretty-words-style',
	) );

	// Register frontend script.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_script ) ) {
		wp_enqueue_script(
			'moconnor-pretty-words-frontend-script',
			plugins_url( $frontend_script, __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

define( 'MO_INSERT_GIPHY_BLOCK_REST_NAMESPACE', 'moconnor/v1' );
define( 'MO_INSERT_GIPHY_BLOCK_API_KEY', 'mo_insert_giphy_block_api_key' );
/**
 * Register custom WP Rest Endpoints to fetch and save the Merriam-Webster API Key.
 */
function rest_endpoint() {
	register_rest_route(
		MO_INSERT_GIPHY_BLOCK_REST_NAMESPACE,
		'api-key/',
		[
			'methods' => \WP_REST_Server::READABLE,
			'callback' => __NAMESPACE__ . '\rest_get_api_key',
			'permission_callback' => __NAMESPACE__ . '\rest_check_permission'
		]
	);

	register_rest_route(
		MO_INSERT_GIPHY_BLOCK_REST_NAMESPACE,
		'api-key/',
		[
			'methods' => \WP_REST_Server::EDITABLE,
			'callback' => __NAMESPACE__ . '\rest_update_api_key',
			'permission_callback' => __NAMESPACE__ . '\rest_check_permission'
		]
	);
}
add_action( 'rest_api_init', __NAMESPACE__ . '\rest_endpoint' );

function rest_get_api_key() {
	$response = new \WP_REST_Response( get_option( MO_INSERT_GIPHY_BLOCK_API_KEY, '' ) );
	$response->set_status( 200 );

	return $response;
}

function rest_update_api_key( $request ) {
	$save_api_key = update_option( MO_INSERT_GIPHY_BLOCK_API_KEY, $request->get_body() );

	$response = new \WP_REST_Response( $save_api_key );
	$response->set_status( 201 );

	return $response;
}

/**
 * Make the custom REST endpoint private and accessible on to users that can `edit_posts`.
 *
 * @return bool
 */
function rest_check_permission() {
	return current_user_can( 'edit_posts' );
}
