$LOAD_PATH.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "model_updates/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name = "model_updates"
  s.version = ModelUpdates::VERSION
  s.authors = ["kaspernj"]
  s.email = ["kaspernj@gmail.com"]
  s.homepage = "https://github.com/kaspernj/model_updates"
  s.summary = "Rails gem to push updates to models into the frontend through ActionCable"
  s.description = "Rails gem to push updates to models into the frontend through ActionCable"
  s.license = "MIT"
  s.required_ruby_version = ">= 2.5.7"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "active_record_query_fixer", ">= 0.0.3"
  s.add_dependency "rails", ">= 5.1.0"
  s.add_dependency "sprockets-es6", ">= 0.9.2"
end
