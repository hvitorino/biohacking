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
  
end
