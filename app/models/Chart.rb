class Chart
  
  def analize config={}
    
    @serieA = Log.where("user_id = ? and kind = ?", config[:user_id], config[:serieA][:id])
    @serieA = @serieA.where("description like ?", config[:serieA][:tags]) if config[:serieA][:tags].present?
    
    @serieB = Log.where("user_id = ? and kind = ?", config[:user_id], config[:serieB][:id])
    @serieB = @serieB.where("description like ?", config[:serieB][:tags]) if config[:serieB][:tags].present?
    
    @series = (@serieA.map{|log| log.logged_at.strftime("%Y-%m-%d") } + @serieA.map{|log| log.logged_at.strftime("%Y-%m-%d") }).uniq
    
    @chart = {
      labels: @series,
      series: ["#{config[:serieA][:serie]} #{config[:serieA][:tags]}", "#{config[:serieB][:serie]} #{config[:serieB][:tags]}"],
      data:  [
        @serieA.map(&:description).compact.map {|x| x[/\d+/]}.compact,
        @serieB.map(&:description).compact.map {|x| x[/\d+/]}.compact
      ]
    }
    
  end
  
end