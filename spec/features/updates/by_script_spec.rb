require "rails_helper"

describe "updates by script" do
  let(:task) { create :task, name: "Test task" }

  it "does update callbacks by script", js: true do
    visit updates_by_script_task_path(task)

    expect(page).to have_http_status :success
    expect(page).to have_current_path updates_by_script_task_path(task), only_path: true
    expect(find(".task-element").text).to eq "Test task"

    sleep 1

    task.update!(name: "New name")

    WaitUtil.wait_for_condition("the name has updated") do
      find(".task-element").text == "New name"
    end
  end
end
