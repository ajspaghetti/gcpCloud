class User
  include Mongoid::Document

  field :username, type: String
  field :email, type: String

  has_many :categories

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end

