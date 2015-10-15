Rails.application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
  devise_scope :users do
    get '/users/auth/facebook' => 'users/omniauth_callbacks#passthru'
    get '/users/auth/facebook/callback' => 'users/omniauth_callbacks#passthru'
    get "sign_in",  :to => "devise/sessions#new"
    get "sign_up",  :to => "devise/registrations#new"
    get "sign_out", :to => "devise/sessions#destroy"
  end

  constraints(format: "json") do
    resources :logs
  end

  constraints(format: "html") do
    get '*path', to: 'home#angular'
  end
  
  get 'extjs', to: "home#extjs"
  
  get 'angular', to: "home#angular"
  
  root 'home#angular'
  
end
