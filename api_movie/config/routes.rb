Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :movies
      resources :reserves , path: "" do
        get 'reserves/:fecha_inicio/:fecha_fin',  action: :index, on: :collection
      end
    end
  end
end
