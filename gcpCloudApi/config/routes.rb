Rails.application.routes.draw do
  # Resourceful routes for items, categories, and users
  resources :items
  resources :categories
  resources :users

  # Mount Action Cable server
  mount ActionCable.server => '/cable'

  # Endpoint for health check
  get "up" => "rails/health#show", as: :rails_health_check

  # Optionally define a root route if you have a landing page
  # root "home#index"
end
