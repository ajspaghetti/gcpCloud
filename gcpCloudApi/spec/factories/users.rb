# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    username { "username#{rand(1000)}" } # Ensures uniqueness
    email { "user#{rand(1000)}@example.com" } # Ensures uniqueness
  end
end
