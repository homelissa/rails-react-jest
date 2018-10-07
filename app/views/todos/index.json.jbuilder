json.todos(@todos) do |todo|
  json.extract! todo, :id, :title, :body
end
