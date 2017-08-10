class ModelUpdates::DestroyChannel < ApplicationCable::Channel
  def subscribed
    model = params[:model].safe_constantize.find(params[:id])
    authorize! :read, model
    stream_for model
  end
end
