module TwilioResponse
require 'twilio-ruby'
  # queries twilio for a response
  def twilio_response(number)
    account_sid = ENV["TWILIO_SID"]
    auth_token = ENV["TWILIO_TOKEN"]
    @client = Twilio::REST::Client.new account_sid, auth_token
  # send the message to each recipient
    @messages = []
    @client.account.messages.list({ from: number }).each do |message| 
       @messages.push( message.body )
    end
    return @messages
end 