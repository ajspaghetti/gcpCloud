# Clear existing data to avoid duplication issues (use cautiously in production)
User.destroy_all
Category.destroy_all
Item.destroy_all

# Create Users
user1 = User.create!(username: 'alex', email: 'alexander@spagno.li')
user2 = User.create!(username: 'test', email: 'test@example.com')

# Create Categories
category1 = Category.create!(name: 'Work', description: 'Work-related tasks', user: user1)
category2 = Category.create!(name: 'Home', description: 'Home chores', user: user1)
category3 = Category.create!(name: 'Misc', description: 'Miscellaneous tasks', user: user2)

# Create Items
item1 = Item.create!(title: 'Finish report', description: 'Complete the annual report', completed: false, due_date: Date.tomorrow)
item2 = Item.create!(title: 'Wash dishes', description: 'Clean all dirty dishes', completed: true, due_date: Date.today)
item3 = Item.create!(title: 'Complete assignment', description: 'Finish up the assignment', completed: false, due_date: Date.tomorrow)

# Associate Items with Categories using has_and_belongs_to_many
category1.items << item1
category1.items << item3
category2.items << item2
