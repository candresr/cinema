class RenamePeliculaIdToMovieId < ActiveRecord::Migration[6.0]
  def change
    rename_column :reserves, :pelicula_id, :movie_id
  end
end
