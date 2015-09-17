class AddDeletedAtToLogs < ActiveRecord::Migration
  def change
    add_column :logs, :deleted_at, :datetime
  end
end
