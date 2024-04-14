class Category
  include Mongoid::Document

  field :name, type: String
  field :description, type: String

  belongs_to :user
  has_and_belongs_to_many :items

  validates :name, presence: true
end
