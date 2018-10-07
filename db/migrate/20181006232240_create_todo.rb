class CreateTodo < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string "title", null: false
      t.string "body", null: false 
    end
  end
end
