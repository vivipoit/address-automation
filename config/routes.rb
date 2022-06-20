Rails.application.routes.draw do
  root to: 'home#index'

  resources :cities, only: %i[index], defaults: { format: 'json' }
end
