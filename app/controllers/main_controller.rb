class MainController < ApplicationController
  before_action :authenticate_user!
  require 'twilio-ruby'
  def index    
  end
end
