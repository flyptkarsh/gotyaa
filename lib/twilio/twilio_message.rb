module TwilioMessage 
    require 'twilio-ruby'
    def twilio_message(number, content)
    
      account_sid = ENV["TWILIO_SID"]
      auth_token = ENV["TWILIO_TOKEN"]
      @client = Twilio::REST::Client.new account_sid, auth_token
    # send the message to each recipient
      @client.account.messages.create({
        :from => '+16467621226', 
        :to => number, 
        :body => content,  
      })
    end 


end