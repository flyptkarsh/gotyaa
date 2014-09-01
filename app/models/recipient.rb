class Recipient < ActiveRecord::Base
  belongs_to :got_yaa 
  validates :name, :phone_number, presence: => true
end
