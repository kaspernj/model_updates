FactoryBot.define do
  factory :task do
    sequence(:name) { |n| "Task #{n}" }
    content { "Test task" }
  end
end
