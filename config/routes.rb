Rails.application.routes.draw do
  root to: 'home#index'

  resources :cities, only: %i[index], defaults: { format: 'json' }
  resources :streets, only: %i[index], defaults: { format: 'json' }
  resources :street_numbers, only: %i[index], defaults: { format: 'json' }
end
