Rails.application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
  devise_scope :users do
    get '/users/auth/facebook' => 'users/omniauth_callbacks#passthru'
    get '/users/auth/facebook/callback' => 'users/omniauth_callbacks#passthru'
    get "sign_in",  :to => "devise/sessions#new"
    get "sign_up",  :to => "devise/registrations#new"
    get "sign_out", :to => "devise/sessions#destroy"
  end
  
  resources :logs
  
  get 'extjs', to: "home#extjs"
  
  get 'angular', to: "home#angular"
  
  root 'home#index'
  
end
