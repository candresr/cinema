module Api
  module V1
    class MoviesController < ApplicationController
      def index
        movie = Movie.order('created_at DESC');
        render json: {status:'SUCCESS', message:'Peliculas Cargados', data:movie}, status: :ok
      end

      def show
        game = Movie.find(params[:id])
        render json: {status:'SUCCESS', message:'Pelicula Cargado', data:movie}, status: :ok
      end

      def create
        movie = Movie.new(movie_params)

        if movie.save
          render json: {status:'SUCCESS', message:'Pelicula Creado', data:movie}, status: :ok
        else
          render json: {status:'EROOR', message:'Pelicula no Creado', data:movie.errors}, status: :unprocessable_entity
        end
      end


      private

      def movie_params
        params.permit(:titulo,:sinopsis,:url,:fecha_inicio,:fecha_fin)
      end
    end
  end
end
