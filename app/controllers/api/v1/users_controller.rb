module Api
  module V1
    class UsersController < ApplicationController
      def index
        @users = User.includes(:climbs).order("climbs.stars desc")
        render json: @users
      end

      def show
        @user = User.find(params[:id])
        # includes(:climbs).order("climbs.stars desc").find
        render json: @user
      end
    end

  end
end
