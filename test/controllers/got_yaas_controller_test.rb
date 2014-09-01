require 'test_helper'

class GotYaasControllerTest < ActionController::TestCase
  setup do
    @got_yaa = got_yaas(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:got_yaas)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create got_yaa" do
    assert_difference('GotYaa.count') do
      post :create, got_yaa: { content: @got_yaa.content }
    end

    assert_redirected_to got_yaa_path(assigns(:got_yaa))
  end

  test "should show got_yaa" do
    get :show, id: @got_yaa
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @got_yaa
    assert_response :success
  end

  test "should update got_yaa" do
    patch :update, id: @got_yaa, got_yaa: { content: @got_yaa.content }
    assert_redirected_to got_yaa_path(assigns(:got_yaa))
  end

  test "should destroy got_yaa" do
    assert_difference('GotYaa.count', -1) do
      delete :destroy, id: @got_yaa
    end

    assert_redirected_to got_yaas_path
  end
end
