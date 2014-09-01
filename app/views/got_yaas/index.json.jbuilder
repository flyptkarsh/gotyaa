json.array!(@got_yaas) do |got_yaa|
  json.extract! got_yaa, :id, :content
  json.url got_yaa_url(got_yaa, format: :json)
end
