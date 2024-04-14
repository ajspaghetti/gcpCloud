class Item
  include Mongoid::Document

  field :title, type: String
  field :description, type: String
  field :completed, type: Boolean, default: false
  field :due_date, type: Date

  has_and_belongs_to_many :categories

  validates :title, presence: true
end
