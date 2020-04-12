class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :titulo
      t.string :sinopsis
      t.string :url
      t.date :fecha_inicio
      t.date :fecha_fin
      t.timestamps
    end
  end
end
