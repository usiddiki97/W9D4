# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                      feed GET    /feed(.:format)                                                                          feeds#show
#               new_session GET    /session/new(.:format)                                                                   sessions#new
#                   session DELETE /session(.:format)                                                                       sessions#destroy
#                           POST   /session(.:format)                                                                       sessions#create
#                    tweets POST   /tweets(.:format)                                                                        tweets#create
#              search_users GET    /users/search(.:format)                                                                  users#search
#               user_follow DELETE /users/:user_id/follow(.:format)                                                         follows#destroy
#                           POST   /users/:user_id/follow(.:format)                                                         follows#create
#                     users POST   /users(.:format)                                                                         users#create
#                  new_user GET    /users/new(.:format)                                                                     users#new
#                      user GET    /users/:id(.:format)                                                                     users#show
#                      root GET    /                                                                                        redirect(301, /feed)
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :feed, only: [:show]
  resource :session, only: [:create, :destroy, :new]
  resources :tweets, only: [:create]
  resources :users, only: [:create, :new, :show] do
    get 'search', on: :collection

    resource :follow, only: [:create, :destroy]
  end

  root to: redirect('/feed')
end
