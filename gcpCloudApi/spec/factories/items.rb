# Assuming you have factories defined for user and category
FactoryBot.define do
  factory :item do
    title { "Sample Item" }
    description { "Sample Description" }
    completed { false }
    due_date { Date.tomorrow }
    category # This assumes you have a factory named category
    user # This assumes you have a factory named user
  end
end
