require "rails_helper"

describe "updates by tags" do
  let!(:task) { create :task }

  it "updates the attributes when changed", :js do
    visit task_path(task)

    sleep 1

    expect(page).to have_http_status :success
    expect(page).to have_current_path task_path(task), only_path: true

    task.update!(name: "New name")

    WaitUtil.wait_for_condition("the text to update") do
      find(".model-updates").text == "New name"
    end
  end
end
