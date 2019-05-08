module Api
  module V1
    class ClimbsController < ApplicationController
      def index
        render json: Climb.all
      end

      def show
        @climb = Climb.find(params[:id])
        render json: @climb
      end

      def destroy
        @climb = Climb.find(params[:id])
        @climb.destroy
      end

      def create
        @climb = Climb.create(climb_params)
      end

      def update
        @climb = Climb.find(params[:id])
        @climb.update(climb_params)
      end

      private

      def climb_params
        params.require(:climb).permit(:user_id, :user_rating, :guide_rating, :name, :stars, :comments, :climb_type, :sent, :mp_link, :pitches)
      end
    end
  end
end
