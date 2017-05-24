$LOAD_PATH.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "model_updates/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "model_updates"
  s.version     = ModelUpdates::VERSION
  s.authors     = ["kaspernj"]
  s.email       = ["kaspernj@gmail.com"]
  s.homepage    = "https://github.com/kaspernj/model_updates"
  s.summary     = "Rails gem to push updates to models into the frontend through ActionCable"
  s.description = "Rails gem to push updates to models into the frontend through ActionCable"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", ">= 5.0.0"
end
