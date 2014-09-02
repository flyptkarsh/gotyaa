class RecipientsController < ApplicationController
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

  def update
    render json: @recipient.to_json, status: 200 if @recipient.update(recipient_params)
  end

  def destroy
    render json: @recipient.to_json if @recipient.destroy
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def recipient_params
      params.require(:recipient).permit(:name, :phone_number, :email, :message_sent, :has_responded)
    end
end
