class ApplicationController < ActionController::API
  # before_action :authenticate_request
  rescue_from Mongoid::Errors::DocumentNotFound, with: :record_not_found
  rescue_from Mongoid::Errors::Validations, with: :validation_error

  private

end
