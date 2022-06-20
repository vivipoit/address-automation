class CreateStreetNumbers < ActiveRecord::Migration[7.0]
  def change
    create_table :street_numbers do |t|
      t.references :street, null: false, foreign_key: true
      t.string :number

      t.timestamps
    end
  end
end
