class LogsController < ApplicationController
  
  respond_to :json
  
  def index
    
    @logs = Log.where(user_id: current_user.id).order(:logged_at)
    respond_with @logs
    
  end
  
end