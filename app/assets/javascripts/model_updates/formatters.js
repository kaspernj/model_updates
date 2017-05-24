function model_updates_date_time_formatter(data) {
  element.text(moment(data.value).format("LLLL"))
}
