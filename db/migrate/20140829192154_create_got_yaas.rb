class CreateGotYaas < ActiveRecord::Migration
  def change
    create_table :got_yaas do |t|
      t.references :user
      t.text :content
      t.timestamps
    end
  end
end
