class RadiosController < ApplicationController
  
#  http_basic_authenticate_with name: "radio", password: "radio", except: [:index, :show]

  def index
    respond_to do |format|
      format.html
      format.json { render json: RadiosDatatable.new(view_context) }
    end
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
      respond_to do |format|
        format.html { redirect_to @radio  }
        format.json { render json: @radio }
      end
    else
      render 'edit'
    end
  end

  def destroy
    @radio = Radio.find(params[:id])
    @radio.destroy

    respond_to do |format|
      format.html { redirect_to radios_path }
      format.json { head :no_content }
      format.js   { render :layout => false }
    end
  end

  private
    def radio_params
      params.require(:radio).permit(:name, :source)
    end
end
