class ChartsController < ApplicationController
  
  respond_to :json
  
  def index
    
    @chart = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      series: ['Series A', 'Series B'],
      data:  [
         [65, 59, 80, 81, 56, 55, 40],
         [28, 48, 40, 19, 86, 27, 90]
      ]
    }
    
    respond_with @chart
  end
  
  
end
