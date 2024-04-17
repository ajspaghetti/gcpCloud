class ApplicationController < ActionController::API
  # before_action :authenticate_request
  rescue_from Mongoid::Errors::DocumentNotFound, with: :record_not_found
  rescue_from Mongoid::Errors::Validations, with: :validation_error

  # Note: Review CORS setup in config/initializers/cors.rb

  private

  # def authenticate_request
  #   username = request.headers['X-Username']
  #   email = request.headers['X-Email']

  #   # This ensures the method looks up by username or email based on what is provided.
  #   @current_user = User.where(username: username).or(User.where(email: email)).first

  #   unless @current_user
  #     render json: { error: 'Unauthorized: No such user exists' }, status: :unauthorized
  #   end
  # end

  # # Error handling for not found documents
  # def record_not_found(exception)
  #   render json: { error: exception.message }, status: :not_found
  # end

  # # Error handling for any validation errors
  # def validation_error(exception)
  #   render json: { error: exception.message }, status: :unprocessable_entity
  # end
end
