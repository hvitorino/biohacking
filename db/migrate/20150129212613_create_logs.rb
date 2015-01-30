class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.belongs_to :user, index: true
      t.integer :kind
      t.text :description
      t.datetime :logged_at

      t.timestamps null: false
    end
    add_foreign_key :logs, :users
  end
end
