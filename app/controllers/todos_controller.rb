class TodosController < ApplicationController
    def index
        @todos = Todo.all
        render '/todos/index'
        # render "todos/index.json"
    end

    def show
        @todo = Todo.find(params[:id])
    end

    def create
        @todo = Todo.new(todo_params)
        if @todo.save
            render :show
        else
            render json: @todo.errors.full_messages, status: 422
        end
    end

    private

    def todo_params
        params.require(:todo).permit(:title, :body)
    end

end
