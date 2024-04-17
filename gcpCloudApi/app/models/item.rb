class Item
  include Mongoid::Document

  field :title, type: String
  field :description, type: String
  field :completed, type: Boolean, default: false
  field :due_date, type: Date

  belongs_to :category
  belongs_to :user

  validates :title, presence: true
end
