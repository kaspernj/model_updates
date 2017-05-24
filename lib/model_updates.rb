require "model_updates/engine"

module ModelUpdates
  path = "#{File.dirname(__FILE__)}/model_updates"

  autoload :AttributeGenerator, "#{path}/attribute_generator"
  autoload :ModelExtensions, "#{path}/model_extensions"
end
