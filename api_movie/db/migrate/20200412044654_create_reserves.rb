class CreateReserves < ActiveRecord::Migration[6.0]
  def change
    create_table :reserves do |t|
      t.string :nombre
      t.string :cedula
      t.string :celular
      t.string :correo
      t.integer :pelicula_id
      t.timestamps
    end
  end
end
