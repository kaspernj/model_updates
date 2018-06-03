class ModelUpdates::UpdateChannel < ApplicationCable::Channel
  def subscribed
    params[:ids].each do |model_class, ids|
      models = model_class.safe_constantize.accessible_by(current_ability).where(id: ids).distinct.fix

      ids_found = {}
      models.find_each do |model|
        next if ids_found.key?(model.id)
        ids_found[model.id] = true

        stream_for model
      end
    end
  end
end
