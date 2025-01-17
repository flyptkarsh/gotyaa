class TwilioController < ApplicationController
  protect_from_forgery :except => [:message, :response]
  
  def message
    params_from = params[:from]
    params_to = params[:to]
    params_body = params[:body]
    account_sid = ENV["TWILIO_SID"]
    auth_token = ENV["TWILIO_TOKEN"]

    @client = Twilio::REST::Client.new account_sid, auth_token
     # send the message to each recipient
    @client.account.messages.create({
      :from => params_from, 
      :to => params_to, 
      :body => params_body 
    })
  end 
end
