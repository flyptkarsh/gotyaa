class RecipientsController < ApplicationController
  protect_from_forgery :except => [:index, :create, :update_all]
  def index
    render json: Recipient.all
  end

  def show
    render json: @recipient.to_json, status: 200
  end

  def create
    @recipient = Recipient.new(recipient_params)
    render json: @recipient.to_json, status: 200 if @recipient.save
  end

  def update_all
    @recipients = Recipient.all
    @responses = [] 
    account_sid = ENV["TWILIO_SID"]
    auth_token = ENV["TWILIO_TOKEN"]
    # set up a client to talk to the Twilio REST API 
    @client = Twilio::REST::Client.new account_sid, auth_token 
    @client.account.messages.list({ to: '+16467621226'}).each do |message| 
    @responses.push(message.from)
    end

     @responses.each do |fromNumber|   
      @recipients.each do |recipient|
        if recipient.phone_number == fromNumber
          recipient_to_update = Recipient.find_by(id: recipient.id) 
          recipient_to_update.has_responded = true
          recipient_to_update.save 
        end 
      end 
    end 

    render json: @recipients.to_json

  end

  def destroy
    render json: @recipient.to_json if @recipient.destroy
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def recipient_params
      params.require(:recipient).permit(:name, :phone_number, :got_yaa_id, :email, :message_sent, :has_responded)
    end
end
