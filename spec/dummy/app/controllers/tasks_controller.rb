class TasksController < ApplicationController
  before_action :find_task, only: [:show, :events, :updates_by_script]

  def show; end

  def events; end

  def updates_by_script; end

private

  def find_task
    @task = Task.find(params[:id])
  end
end
