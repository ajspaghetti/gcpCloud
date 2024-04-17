# Clear existing data to avoid duplication issues (use cautiously in production)
User.destroy_all
Category.destroy_all
Item.destroy_all

# Create Users
users = [
  { username: 'alex', email: 'alex@example.com' },
  { username: 'john', email: 'john@example.com' },
  { username: 'maria', email: 'maria@example.com' },
  { username: 'lisa', email: 'lisa@example.com' }
].map { |user| User.create!(user) }

# Create Categories
categories = [
  'Work', 'Home', 'Personal Development', 'Health', 'Education',
  'Shopping', 'Outdoor Activities', 'Tech', 'Travel', 'Fitness',
  'Art', 'Music', 'Cooking', 'Gardening', 'Finance'
].map { |name| Category.create!(name: name, description: "#{name} related tasks") }

# Create Items
25.times do |i|
  item = Item.create!(
    title: "Task ##{i + 1}",
    description: "Description for task ##{i + 1}",
    completed: [true, false].sample,
    due_date: Date.today + rand(-15..15).days,
    user: users.sample,
    category: categories.sample
  )
end

puts "Database seeded successfully!"
