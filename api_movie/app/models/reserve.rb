class Reserve < ApplicationRecord
  belongs_to :movie
  scope :filter_dates, ->(time1, time2) { where(created_at: time1..time2) }
end
