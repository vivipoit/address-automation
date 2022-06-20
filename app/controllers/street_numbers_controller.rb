class StreetNumbersController < ApplicationController
  def index
    @street_numbers = StreetNumber.where(street: params[:street_id].to_i)
  end
end
