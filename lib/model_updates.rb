require "model_updates/engine"
require "sprockets/es6"

module ModelUpdates
  path = "#{File.dirname(__FILE__)}/model_updates"

  autoload :AttributeGenerator, "#{path}/attribute_generator"
  autoload :ModelExtensions, "#{path}/model_extensions"
end
