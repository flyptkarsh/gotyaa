# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Recipient.create(got_yaa_id: 1, name: 'Bob', phone_number: '+17149152596', message_sent: true, has_responded: true )
Recipient.create(got_yaa_id: 1, name: 'Tod', phone_number: '+17149156596', message_sent: true, has_responded: true )
Recipient.create(got_yaa_id: 1, name: 'Rob', phone_number: '+17149155596', message_sent: true, has_responded: true )
Recipient.create(got_yaa_id: 2, name: 'Ted', phone_number: '+17149158596', message_sent: true, has_responded: true )
Recipient.create(got_yaa_id: 2, name: 'Red', phone_number: '+17149155596', message_sent: true, has_responded: true )
Recipient.create(got_yaa_id: 2, name: 'Ben', phone_number: '+17149157596', message_sent: true, has_responded: true )
Recipient.create(got_yaa_id: 3, name: 'Guy', phone_number: '+17149158596', message_sent: true, has_responded: true )
Recipient.create(got_yaa_id: 3, name: 'Lou', phone_number: '+17149159596', message_sent: true, has_responded: true )
Recipient.create(got_yaa_id: 4, name: 'Stu', phone_number: '+17149152596', message_sent: true, has_responded: true )
Recipient.create(got_yaa_id: 5, name: 'Ron', phone_number: '+17149158596', message_sent: true, has_responded: true )

GotYaa.create(user_id: 1, content: "My pants are on fire")
GotYaa.create(user_id: 1, content: "My pants are really on fire")
GotYaa.create(user_id: 1, content: "Help my pants are on fire")
GotYaa.create(user_id: 1, content: "I died because my pants are on fire")
GotYaa.create(user_id: 2, content: "My pants are on fire")
GotYaa.create(user_id: 2, content: "My pants are really on fire")
GotYaa.create(user_id: 2, content: "Help my pants are on fire")
GotYaa.create(user_id: 2, content: "I died because my pants are on fire")
GotYaa.create(user_id: 3, content: "My pants are on fire")
GotYaa.create(user_id: 3, content: "My pants are really on fire")
GotYaa.create(user_id: 3, content: "Help my pants are on fire")
GotYaa.create(user_id: 3, content: "I died because my pants are on fire")
GotYaa.create(user_id: 4, content: "My pants are on fire")
GotYaa.create(user_id: 4, content: "My pants are really on fire")
GotYaa.create(user_id: 4, content: "Help my pants are on fire")
GotYaa.create(user_id: 4, content: "I died because my pants are on fire")
GotYaa.create(user_id: 5, content: "My pants are on fire")
GotYaa.create(user_id: 5, content: "My pants are really on fire")
GotYaa.create(user_id: 5, content: "Help my pants are on fire")
GotYaa.create(user_id: 5, content: "I died because my pants are on fire")
