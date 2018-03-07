require "rails_helper"

describe "events" do
  let(:task) { create :task }

  it "reacts to events", js: true do
    visit events_task_path(task)

    expect(page).to have_http_status :success
    expect(current_path).to eq events_task_path(task)
    expect(page).to_not have_selector ".task-element"

    task.model_updates_call("test-event", id: task.id, text: "Hello world")

    WaitUtil.wait_for_condition("the event element to appear") do
      page.has_selector?(".task-element")
    end
  end
end
