require "rails_helper"

describe ModelUpdates do
  let!(:task) { create :task }

  it "updates the attributes when changed", js: true do
    visit task_path(task)

    expect(page).to have_http_status :success
    expect(current_path).to eq task_path(task)

    task.update!(name: "New name")

    sleep 0.5

    expect(find(".model-updates").text).to eq "New name"
  end
end
