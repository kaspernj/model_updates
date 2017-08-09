class ModelUpdates::UpdateChannel < ApplicationCable::Channel
  def subscribed
    model_class = params[:model].safe_constantize

    channel_name = "ModelUpdatesCreate#{params[:model]}"
    stream_from channel_name do |data|
      model = model_class.find(args.fetch(:id))
      next unless can?(:read, model)
      transmit data
    end
  end
end
