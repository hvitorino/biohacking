class ChartsController < ApplicationController
  
  respond_to :json
  
  def index
  
=begin
    @chart = {
      labels: ["2015-11-01", "2015-11-02", "2015-11-06", "2015-11-08"],
      series: ['WEIGHT', 'DRINK #coffee'],
      data:  [
         [82.5, 0, 85, 83],
         [250, 250, 500, 500]
      ]
    }



  
=end

@config = {
  serieA: {
    serie: "WEIGHT",
    id: 1
  },
  serieB: {
    serie: "DRINK",
    id: 3
  }
}

    
    @config[:user_id] = current_user.id

    @chart = Chart.new.analize @config
    respond_with @chart
  end
  
  
end
