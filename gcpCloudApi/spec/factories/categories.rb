# spec/factories/categories.rb
FactoryBot.define do
  factory :category do
    name { "Category #{rand(1000)}" } # Simple unique name
    description { "Description of category." }
  end
end
