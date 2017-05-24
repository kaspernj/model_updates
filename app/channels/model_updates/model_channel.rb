class ModelUpdates::ModelChannel < ApplicationCable::Channel
  def subscribed
    model = params[:model].constantize.find(params[:id])
    stream_for model
  end
end
