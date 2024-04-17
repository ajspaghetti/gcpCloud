class Category
  include Mongoid::Document

  field :name, type: String
  field :description, type: String

  has_many :items

  validates :name, presence: true, uniqueness: true

  # Define a method to get users indirectly through items
  def users
    User.in(id: items.pluck(:user_id))
  end
end
