class Task < ApplicationRecord
  model_updates_broadcast_attributes attributes: %i[name content updated_at]
end
