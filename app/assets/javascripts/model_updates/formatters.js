function model_updates_date_time_formatter(data) {
  if (data.value) {
    newValue = moment(data.value).format("LLLL")
    data.element.text(newValue)
  } else {
    data.element.text("")
  }
}
