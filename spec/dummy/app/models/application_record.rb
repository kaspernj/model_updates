class ApplicationRecord < ActiveRecord::Base
  include ModelUpdates::ModelExtensions

  self.abstract_class = true
end
