class MainController < ApplicationController
  before_action :authenticate_user!
  require 'twilio-ruby'
  def index    
  end
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

  def twilio_response(number)
    account_sid = ENV["TWILIO_SID"]
    auth_token = ENV["TWILIO_TOKEN"]
    @client = Twilio::REST::Client.new account_sid, auth_token
    # send the message to each recipient
    @messages = []
    @client.account.messages.list({ from: number }).each do |message| 
       @messages.push( message.body )
    end
  end 
end
