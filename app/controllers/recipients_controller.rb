class RecipientsController < ApplicationController

  def index
    @recipients = Recipient.all
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy

  end

  private
  
    # Never trust parameters from the scary internet, only allow the white list through.
    def recipient_params
      params.require(:recipient).permit(:name, :phone_number, :email, :message_sent, :has_responded)
    end
end
