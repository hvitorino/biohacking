class LogsController < ApplicationController
  
  respond_to :json
  
  def index
    @logs = Log.search current_user, params
    respond_with @logs
  end
  
  def create
    @log = Log.new params.require(:log).permit!
    @log.user_id = current_user.id    
    @log.save
#     Log.create user_id:1, kind: Log::HUNGRY, description: "#soft", logged_at: "2015-01-30 15:24:00"
    respond_with @log
  end
  
end