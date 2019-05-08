Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :climbs
      resources :users
    end
  end
end
