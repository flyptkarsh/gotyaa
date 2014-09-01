class CreateRecipients < ActiveRecord::Migration
  def change
    create_table :recipients do |t|
      t.references :got_yaa
      t.string :name
      t.string :phone_number
      t.string :email
      t.boolean :message_sent
      t.boolean :has_responded

      t.timestamps
    end
  end
end
