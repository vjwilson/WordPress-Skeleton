# WordPress Skeleton

A skeleton install of WordPress, with the WordPress core separated out as a Git submodule, and the user content stored in a `/content/` directory, instead of `/wp-content/`.

## Getting Started

### In Bitbucket...
1. Create a new repository in the **teamknowmad** account in Bitbucket. Give it a name so that it is clear who the client is and what type of project it is. (For instance, if this is a prototype site for Acme Inc., you could use `prototype.acme.com` )
1. At the ***Repository setup*** screen in Bitbucket, click the *I have an existing project* turndown arrow. You will need the instructions there in a later step.
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

1. Run the Bash script `rename_theme.sh` with what you want your theme's name to be as its only argument

        ./rename_theme.sh new_theme_name
    
1. Open the `Gruntfile.js` file, and replace the \<account> and \<hostname> placeholders with the values for your server.

## Adding a Custom Theme

The official WordPress repo that is pulled in by the Git submodule contains only the standard themes that come with the current WordPress stable version. You need to add your own theme.

The Gruntfile is tuned to help with a theme with the following directory structure:

 


## Origin

The WordPress folder layout for this Skeleton is adapted from Mark Jaquith's WordPress-Skeleton  [https://github.com/markjaquith/WordPress-Skeleton](https://github.com/markjaquith/WordPress-Skeleton)
