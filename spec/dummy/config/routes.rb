Rails.application.routes.draw do
  mount ModelUpdates::Engine => "/model_updates"

  resources :tasks, only: [:index, :show] do
    get :events, on: :member
    get :updates_by_script, on: :member
  end
end
