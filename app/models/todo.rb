class Todo < ApplicationRecord 
    validates :title, :body, presence: true 
end 