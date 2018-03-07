class Task < ApplicationRecord
  model_updates_broadcast_attributes attributes: %i[name content updated_at]
  model_updates_broadcast_created
  model_updates_broadcast_destroyed

  validates :name, :content, presence: true
end
