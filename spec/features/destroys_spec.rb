require "rails_helper"

describe "destroys" do
  let!(:task) { create :task }

  it "removes the element when destroyed", js: true do
    visit task_path(task)

    sleep 1

    expect(page).to have_http_status :success
    expect(page).to have_current_path task_path(task), only_path: true
    expect(page).to have_selector ".model-updates[data-model-updates-model='Task'][data-model-updates-id='#{task.id}']"

    task.destroy!

    WaitUtil.wait_for_condition("the element to be removed") do
      !page.has_selector?(".model-updates[data-model-updates-model='Task'][data-model-updates-id='#{task.id}']")
    end
  end
end
