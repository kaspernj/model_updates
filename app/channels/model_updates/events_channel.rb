class ModelUpdates::EventsChannel < ApplicationCable::Channel
  def subscribed
    connect_models if params[:callback_data][:connect_model].present?
    connect_model_classes if params[:callback_data][:connect_model_class].present?
  end

private

  def connect_models
    params[:callback_data][:connect_model].each do |model_class_name, events|
      events.each do |event_name, ids|
        models = model_class_name.safe_constantize.accessible_by(current_ability).where(id: ids).distinct.fix
        models.find_each do |model|
          stream_model(event: event_name, model: model)
        end
      end
    end
  end

  def connect_model_classes
    params[:callback_data][:connect_model_class].each do |model_class_name|
      stream_model_class(model_class: model_class_name.safe_constantize)
    end
  end

  def stream_model(event:, model:)
    channel_name = "model_updates_events_model_#{model.class.name}_model_#{model.id}_event_#{event}"
    stream_from(channel_name, coder: ActiveSupport::JSON) do |data|
      transmit data
    end
  end

  def stream_model_class(model_class:)
    channel_name = "model_updates_events_class_#{model_class.name}"
    stream_from(channel_name, coder: ActiveSupport::JSON) do |data|
      transmit data
    end
  end
end
