class CreateRadios < ActiveRecord::Migration
  def change
    create_table :radios do |t|
      t.string :name
      t.string :source

      t.timestamps null: false
    end
  end
end
