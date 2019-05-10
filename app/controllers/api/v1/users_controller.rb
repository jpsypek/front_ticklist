module Api
  module V1
    class UsersController < ApplicationController
      def index
        @users = User.all
        render json: @users.to_json(only: [:id, :name])
      end

      def show
        @user = User.includes(:climbs).order("climbs.stars desc").find(params[:id])
        render json: @user
      end
    end

  end
end
