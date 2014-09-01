json.array!(@recipients) do |recipient|
  json.extract! recipient, :id, :name, :phone_number, :email, :message_sent, :has_responded
  json.url recipient_url(recipient, format: :json)
end
