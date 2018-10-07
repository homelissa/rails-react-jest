@todos.each do |todo|
    json.set! todo.id do 
        json.extract! todo, :id, :title, :body
    end 
end 