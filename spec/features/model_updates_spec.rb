require "rails_helper"

describe ModelUpdates do
  let!(:task) { create :task }

  # Doesnt look like it is possible to test yet: https://github.com/rails/rails/pull/23211
  xit "updates the attributes when changed", js: true do
    visit task_path(task)

    expect(page).to have_http_status :success
    expect(current_path).to eq task_path(task)

    task.update_attributes!(name: "New name")

    sleep 1

    puts page.html

    expect(find(".model-updates").text).to eq "New name"
  end
end
