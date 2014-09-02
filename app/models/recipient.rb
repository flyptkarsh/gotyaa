class Recipient < ActiveRecord::Base
  belongs_to :got_yaa
  include TwilioMessage
  include TwilioResponse
end
