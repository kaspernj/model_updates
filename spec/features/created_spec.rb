require "rails_helper"

describe "created" do
  let(:task) { create :task }

  it "adds an element to a list", js: true do
    visit tasks_path

    sleep 1

    expect(page).to have_http_status :success
    expect(page).to have_current_path tasks_path, ignore_query: true
    expect(page).to have_selector ".tasks-list"
    expect(page).not_to have_selector ".task-element"

    task

    WaitUtil.wait_for_condition("task element to be added") do
      page.has_selector?(".task-element")
    end
  end
end
