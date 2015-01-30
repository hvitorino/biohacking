class LogsController < ApplicationController
  
  respond_to :json
  
  def index
    
    @logs = Log.where(user_id: current_user.id).order(:logged_at)
    respond_with @logs
    
  end
  
  def create
    @log = Log.create user_id: current_user.id,
                      kind: params[:kind],
                      description: params[:description], 
                      logged_at: params[:logged_at]
    
#     Log.create user_id:1, kind: Log::HUNGRY, description: "#soft", logged_at: "2015-01-30 15:24:00"
    
    respond_with @log
  end
  
end