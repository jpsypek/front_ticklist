class ClimbSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_rating, :guide_rating, :stars, :comments, :climb_type, :sent, :mp_link, :pitches, :user
  # belongs_to :user
end
