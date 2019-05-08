class UserSerializer < ActiveModel::Serializer
  # has_many :climbs
  attributes :id, :name, :climbs

end
