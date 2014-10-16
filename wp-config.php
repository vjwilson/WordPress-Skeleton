<?php
// ===================================================
// Load database info and local development parameters
// ===================================================
if ( file_exists( dirname( __FILE__ ) . '/local-config.php' ) ) {
	define( 'WP_LOCAL_DEV', true );
	include( dirname( __FILE__ ) . '/local-config.php' );
} else {
	define( 'WP_LOCAL_DEV', false );
	define( 'DB_NAME', '%%DB_NAME%%' );
	define( 'DB_USER', '%%DB_USER%%' );
	define( 'DB_PASSWORD', '%%DB_PASSWORD%%' );
	define( 'DB_HOST', '%%DB_HOST%%' ); // Probably 'localhost'
}

// ========================
// Custom Content Directory
// ========================
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/content' );
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/content' );

// ================================================
// You almost certainly do not want to change these
// ================================================
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// ==============================================================
// Salts, for security
// Grab these from: https://api.wordpress.org/secret-key/1.1/salt
// ==============================================================
define('AUTH_KEY',         '`yQH[6D>3,~oY>rG6J!5ySi;?nwcQ)_iZ<FV2x~&|!^.[i-+3p2f>(rEKY.blL7:');
define('SECURE_AUTH_KEY',  'kBUtO</gsnf0GrOu+uZ<_ o0Q>4&VL@wH|#Qf@^OlvNq#d9%8*d)}1||aC!T6A=!');
define('LOGGED_IN_KEY',    'RS#phTVVCeH4JaTDPx1Wd-}{e+dV +sG`TbK)l{SR=wZ2Z;`~A))WL6V+R{Y6,b-');
define('NONCE_KEY',        'C1_7_`ULpxZ,Tbiy:YuGUNxsel+X2<x[_=6Zmk_<crZ}kz+eZ#u~/LS53-taD(Px');
define('AUTH_SALT',        '>)p.e|OOR|#e+zWI.q7)+gE(<4pZ7N-DTp3|l%e1<ur~CgfT|<Zq9&C_ +)wIO68');
define('SECURE_AUTH_SALT', '-R;O ~,7NkUigtnhutfxYupto-D4PONNiJ?k,d+Rk(&6|h/ju|1X(U9|wK~h8tF;');
define('LOGGED_IN_SALT',   ']qu|]q&^,I2GY77C)iIzc.6t~/x}t0&z-VD6@blf9`S+Nm#ds=hQ)]O`tdtr[d_^');
define('NONCE_SALT',       'cJ}:A^iN+hLK_W`;WpWOi@?#l?v7.B^v)QpjXih{|J)s:%zRIP$aG.8Tua+_zYUS');

// ==============================================================
// Table prefix
// Change this if you have multiple installs in the same database
// ==============================================================
$table_prefix  = 'wp_';

// ================================
// Language
// Leave blank for American English
// ================================
define( 'WPLANG', '' );

// Enable WP_DEBUG mode
define('WP_DEBUG', true);

// Enable Debug logging to the /wp-content/debug.log file
define('WP_DEBUG_LOG', true);

// Disable display of errors and warnings 
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors',0);

// Use dev versions of core JS and CSS files (only needed if you are modifying these core files)
define('SCRIPT_DEBUG', true);

// =================================================================
// Debug mode
// Debugging? Enable these. Can also enable them in local-config.php
// =================================================================
// define( 'SAVEQUERIES', true );
// define( 'WP_DEBUG', true );

// ======================================
// Load a Memcached config if we have one
// ======================================
if ( file_exists( dirname( __FILE__ ) . '/memcached.php' ) )
	$memcached_servers = include( dirname( __FILE__ ) . '/memcached.php' );

// ===========================================================================================
// This can be used to programatically set the stage when deploying (e.g. production, staging)
// ===========================================================================================
define( 'WP_STAGE', '%%WP_STAGE%%' );
define( 'STAGING_DOMAIN', '%%WP_STAGING_DOMAIN%%' ); // Does magic in WP Stack to handle staging domain rewriting

// ===================
// Bootstrap WordPress
// ===================
if ( !defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/wp/' );
require_once( ABSPATH . 'wp-settings.php' );
