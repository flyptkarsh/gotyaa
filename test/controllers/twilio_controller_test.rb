require 'test_helper'

class TwilioControllerTest < ActionController::TestCase
  test "should get message" do
    get :message
    assert_response :success
  end

  test "should get response" do
    get :response
    assert_response :success
  end

end
