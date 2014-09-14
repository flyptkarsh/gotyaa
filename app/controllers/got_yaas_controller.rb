class GotYaasController < ApplicationController
  protect_from_forgery :except => [:index, :create, :destroy]
  def index
    render json: GotYaa.all
  end

  def show
    render json: @got_yaa.to_json, status: 200
  end

  def create
    @got_yaa = GotYaa.new(got_yaa_params)
    render json: @got_yaa.to_json, status: 200 if @got_yaa.save
  end
  
  def destroy
    GotYaa.delete(params[:id])
    render json: @got_yaa.to_json, status: 200 if @got_yaa.delete
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def got_yaa_params
      params.require(:got_yaa).permit(:content, :user_id)
    end
end
