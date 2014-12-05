# WordPress Skeleton

A skeleton install of WordPress, with the WordPress core separated out as a Git submodule, and the user content stored in a `/content/` directory, instead of `/wp-content/`.

## Getting Started

### In your remote Git service ...
1. Create a new repository in your account on the service where you will keep your canonical copy of the new repo (GitHub, Bitbucket, etc.). Give it a name so that it is clear who the client is and what type of project it is. (For instance, if this is a prototype site for Acme Inc., you could use `prototype.acme.com` )
1. At the ***Quick Setup*** or ***Repository setup*** screen in your remote service, make note of the *I have an existing project* instructions. You will need the instructions there in a later step.
### Now, on your local machine...
1. Decide where you want your new code repo to live. For instance, I keep a `~/Projects/` folder on my local machine, and I also create individual customer folders in that folder, so that if a customer has more than one site/app/project, each one would have its own repo.
1. In the customer's directory, clone both this WordPress-Skeleton repo, and the included WordPress submodule all at once. Replace `<projectname>` with the name of this project.

        git clone --recursive git@bitbucket.org:teamknowmad/wordpress-skeleton.git <projectname>
        
1. Switch into the new repo directory

        cd <projectname>

1. Change the remote reference for this repo from `origin` to `upstream`.

        git remote rename origin upstream

1. Now, use the Bitbucket instructions from Step 2 above to link your new cloned skeleton to your new Bitbucket repo.

        git remote add origin git@bitbucket.org:teamknowmad/<projectname>.git
        git push -u origin --all   # pushes up the repo and its refs for the first time
        git push -u origin --tags  # pushes up any tags 

## Customizing the Repo for the New Project

(this information is based on the the tuturial: [Setting up Mark Jaquith’s wp-stack and wp-skeleton for Capristrano deployment](http://design.zhiwan.is/setting-up-mark-jaquiths-wp-stacks-and-wp-skeleton-for-capristrano-deployment/) )

1. Edit the `wp-config.php`. Replace the %%DB_NAME%%, %%DB_USER%%, %%DB_PASSWORD%%, %%DB_HOST%% placeholders with the appropriate values for your server.
1. Generate new security salts at [https://api.wordpress.org/secret-key/1.1/salt/](https://api.wordpress.org/secret-key/1.1/salt/), and insert them into `wp-config.php` as well.
1. If you will be running a dev environment on your local machine, rename `local-config-sample.php` to `local-config.php` and add the appropriate database credentials to that file. (Note that `local-config.php` is in `.gitignore`, and so will not be pushed up to any remote repo.) 
1. Create the directory structure for uploads so that uploaded images live outside the repo.

        mkdir -p shared/content/uploads


## Customizing the Theme for a Client

The official WordPress repo that is pulled in by the Git submodule contains only the standard themes that come with the current WordPress stable version. You should customize the theme. Start by doing the following:

1. Run the Bash script `rename_theme.sh` with what you want your theme's name to be as its only argument

        ./rename_theme.sh new_theme_name
    
1. Update the stylesheet header in style.css with the new client's information.
1. Open the `Gruntfile.js` file, and replace the \<account> and \<hostname> placeholders with the values for your server.
1. In order to use the Grunt development helper tasks, you must install their node packages:

        npm install
      
1. In order to use the SASS preproccessor to generate the CSS, the only thing in the theme's `style.css` file is the Wordpress header info. The theme's `functions.php` will include a css file at `includes/css/main.min.css`. It also includes minified versions of the Javascript files. All these minified files are first created or updated by running this Grunt task.

        grunt build
        
1. Once the asset files (CSS / JS ) are build, you can keep them updated file you are working on the theme by running the default Grunt task, which watches all the asset folders for changes:

        grunt


The Gruntfile is tuned to help with a theme with the directory structure listed below.

Most editing should be done in the `includes/sass/_application.scss` file for CSS changes, the `includes/js/main.js` file for JS changes, and by adding theme-dependent images to the `includes/images/` directory.

Make these changes while running the default `grunt` command to "watch" those directories, or re-build the site after changes by running `grunt build`.

        ├── 404.php
        ├── README.md
        ├── archive.php
        ├── comments.php
        ├── content-page.php
        ├── content-single.php
        ├── content.php
        ├── footer.php
        ├── functions.php
        ├── header.php
        ├── image.php
        ├── includes
        │   ├── bootstrap-wp-navwalker.php
        │   ├── css
        │   │   ├── main.css
        │   │   ├── main.css.map
        │   │   └── main.min.css
        │   ├── custom-header.php
        │   ├── customizer.php
        │   ├── extras.php
        │   ├── images
        │   ├── jetpack.php
        │   ├── js
        │   │   ├── bootstrap-wp.js
        │   │   ├── customizer.js
        │   │   ├── keyboard-image-navigation.js
        │   │   ├── main.js
        │   │   ├── main.min.js
        │   │   ├── main.min.map
        │   │   ├── plugins.min.js
        │   │   ├── plugins.min.map
        │   │   └── skip-link-focus-fix.js
        │   ├── resources
        │   │   └── bootstrap
        │   ├── sass
        │   │   ├── _application.scss
        │   │   ├── _bootstrap-wp.scss
        │   │   ├── _fonts.scss
        │   │   └── main.scss
        │   └── template-tags.php
        ├── index.php
        ├── no-results.php
        ├── page.php
        ├── rtl.css
        ├── screenshot.png
        ├── search.php
        ├── searchform.php
        ├── sidebar.php
        ├── single.php
        └── style.css

 


## Origin

The WordPress folder layout for this Skeleton is adapted from Mark Jaquith's WordPress-Skeleton  [https://github.com/markjaquith/WordPress-Skeleton](https://github.com/markjaquith/WordPress-Skeleton)
