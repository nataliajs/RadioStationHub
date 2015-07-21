class RadiosDatatable
  delegate :params, :link_to, :number_to_currency, to: :@view

  def initialize(view)
    @view = view
  end

  def as_json(options = {})
    {
      sEcho: params[:sEcho].to_i,
      iTotalRecords: Radio.count,
      iTotalDisplayRecords: radios.total_entries,
      aaData: data
    }
  end

private

  def data
    radios.map do |radio|
      {
        :name => radio.name,
        :source => radio.source
      }
    end
  end

  def radios
    @radios ||= fetch_radios
  end

  def fetch_radios
    radios = Radio.order("#{sort_column} #{sort_direction}")
    radios = radios.page(page).per_page(per_page)
    if params[:sSearch].present?
      radios = radios.where("name like :search or category like :search", search: "%#{params[:sSearch]}%")
    end
    radios
  end

  def page
    params[:iDisplayStart].to_i/per_page + 1
  end

  def per_page
    params[:iDisplayLength].to_i > 0 ? params[:iDisplayLength].to_i : 10
  end

  def sort_column
    columns = %w[name source]
    columns[params[:iSortCol_0].to_i]
  end

  def sort_direction
    params[:sSortDir_0] == "desc" ? "desc" : "asc"
  end
end
