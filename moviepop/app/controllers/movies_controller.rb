class MoviesController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @movies = Movie.all
    @movie = Movie.new
  end

  def create
    @movie = Movie.new
    # binding.pry
    favorites = Favorite.create(
      # actors: params[:actors],
      # director: params[:director],
      # genre: params[:genre],
      # imdbRating: params[:imdbRating],
      # imdbVotes: params[:imdbVotes],
      # poster: params[:poster],
      # title: params[:title],
      user_id: params[:user_id],
      imdbID: params[:imdbID]
      # writer: params[:writer],
      # year: params[:year]
    )

  end

end
