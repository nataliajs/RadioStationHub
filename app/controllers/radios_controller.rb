class RadiosController < ApplicationController
  
  http_basic_authenticate_with name: "radio", password: "radio",
except: [:index, :show]

  def index
    @radios = Radio.all
  end

  def show
    @radio = Radio.find(params[:id])
  end

  def new
  end

  def edit
    @radio = Radio.find(params[:id])
  end

  def create
    @radio = Radio.new(radio_params)

    @radio.save
    redirect_to @radio
  end

  def update
    @radio = Radio.find(params[:id])
 
    if @radio.update(radio_params)
      redirect_to @radio
    else
      render 'edit'
    end
  end

  def destroy
    @radio = Radio.find(params[:id])
    @radio.destroy

    redirect_to radios_path
  end

  private
    def radio_params
      params.require(:radio).permit(:name, :source)
    end
end
