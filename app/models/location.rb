class Location < ApplicationRecord
    has_many :foods, dependent: :destroy
end
