class ChartsController < ApplicationController
  
  respond_to :json
  
  def index
  
    #@serieA = Log.where(user_id: 1, kind: Log::WEIGHT).select{|log| log.description.present? }
    #@serieB = Log.where(user_id: 1, kind: Log::DRINK).select{|log| log.description.present? }
    
    @chart = {
      labels: ["2015-11-01", "2015-11-02", "2015-11-06", "2015-11-08"],
      series: ['WEIGHT', 'DRINK #coffee'],
      data:  [
         [82.5, 0, 85, 83],
         [250, 250, 500, 500]
      ]
    }
    
    respond_with @chart
  end
  
  
end
