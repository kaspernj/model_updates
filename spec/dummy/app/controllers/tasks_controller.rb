class TasksController < ApplicationController
  def show
    @task = Task.find(params[:id])
  end

  def events
    @task = Task.find(params[:id])
  end
end
