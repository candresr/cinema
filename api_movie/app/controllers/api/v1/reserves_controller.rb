module Api
  module V1
    class ReservesController < ApplicationController
      def index
        if  params[:fecha_inicio] && params[:fecha_fin]
           filter = Reserve.filter_dates(params[:fecha_inicio],params[:fecha_fin])
           render json: {status:'SUCCESS', message:'filtro de fecha', data:filter}, status: :ok
         else
           reserve = Reserve.select(:nombre,:cedula,:celular,:correo,:'movies.titulo').joins(:movie)
           render json: {status:'SUCCESS', message:'Reservas Cargados', data:reserve}, status: :ok
        end
      end

      def create
        reservation = Reserve.where(movie_id: reserve_params[:movie_id]).select("COUNT(reserves.id) AS total")

        if reservation.first.total > 2
          render json: {status:'ERROR', message:'Reservacion agotada', data:reservation}, status: :ok
        else
          reserve = Reserve.new(reserve_params)

          if reserve.save
            render json: {status:'SUCCESS', message:'Pelicula Creado', data:reserve}, status: :ok
          else
            render json: {status:'ERROR', message:'Pelicula no Creado', data:reserve.errors}, status: :unprocessable_entity
          end
        end
      end


      private

      def reserve_params
        params.permit(:nombre,:cedula,:celular,:correo,:movie_id)
      end
    end
  end
end
