# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( main.css )
Rails.application.config.assets.precompile += %w( datatables/media/css/jquery.dataTables.css )
Rails.application.config.assets.precompile += %w( bootstrap/dist/css/bootstrap.css )
Rails.application.config.assets.precompile += %w( growl/jquery.growl.css )

Rails.application.config.assets.precompile += %w( jquery/dist/jquery.js )
Rails.application.config.assets.precompile += %w( datatables/media/js/jquery.dataTables.js )
Rails.application.config.assets.precompile += %w( bootstrap/dist/js/bootstrap.js )
Rails.application.config.assets.precompile += %w( growl/jquery.growl.js )
Rails.application.config.assets.precompile += %w( jquery.validate.min.js )
Rails.application.config.assets.precompile += %w( main.js )