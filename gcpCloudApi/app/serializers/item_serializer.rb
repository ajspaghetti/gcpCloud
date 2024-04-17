class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :completed, :due_date

  belongs_to :user
  belongs_to :category
end
