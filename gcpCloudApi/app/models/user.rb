# app/models/user.rb
class User
  include Mongoid::Document

  field :username, type: String
  field :email, type: String

  has_many :items

  # Define a method to get categories indirectly
  def categories
    Category.in(id: items.pluck(:category_id))
  end

  validates :username, presence: true, uniqueness: true
  # validates :email, presence: true, uniqueness: true
end
