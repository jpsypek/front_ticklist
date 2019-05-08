class CreateClimbs < ActiveRecord::Migration[5.2]
  def change
    create_table :climbs do |t|
      t.references :user, foreign_key: true
      t.string :user_rating
      t.string :guide_rating
      t.string :name
      t.integer :stars
      t.text :comments
      t.string :climb_type
      t.boolean :sent
      t.string :mp_link
      t.integer :pitches
      t.timestamps
    end
  end
end
