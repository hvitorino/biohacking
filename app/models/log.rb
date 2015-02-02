class Log < ActiveRecord::Base
  belongs_to :user
  
  WEIGHT=1
  EAT=2
  DRINK=3
  WORKOUT=4
  HUNGRY=5
  SLEEP=6
  WAKEUP=7
  URINATE=8
  DEFECATE=9
  SEX=10
  BATH=11
  
  def self.search user, params
    query = where(user_id: user.id)
    
    query = query.where("description like ?", "%#{params[:description]}%") if params[:description].present?
    query = query.where(kind: params[:kind]) if params[:kind].present?
    
    #logged_at_begin: "2015", logged_at_end: "2015"
    
    query.order(:logged_at)
  end
  
end
