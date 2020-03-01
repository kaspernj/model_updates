class ModelUpdates::CreateChannel < ApplicationCable::Channel
  def subscribed
    model_class = params[:model].safe_constantize
    channel_name = "ModelUpdatesCreate#{params[:model]}"

    stream_from(channel_name, coder: ActiveSupport::JSON) do |data|
      model = model_class.accessible_by(current_ability).find(data.fetch("id"))
      next unless model

      transmit data
    end
  end
end
