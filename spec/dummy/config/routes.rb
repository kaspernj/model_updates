Rails.application.routes.draw do
  mount ModelUpdates::Engine => "/model_updates"

  resources :tasks, only: :show
end
