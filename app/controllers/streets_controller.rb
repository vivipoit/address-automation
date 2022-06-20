class StreetsController < ApplicationController
  def index
    @streets = Street.where(city_id: params[:city_id].to_i)
  end
end
