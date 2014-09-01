class GotYaasController < ApplicationController

  def index
    @got_yaas = GotYaa.all
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
    def got_yaa_params
      params.require(:got_yaa).permit(:content)
    end
end
