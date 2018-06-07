function model_updates_date_time_formatter(data) {
  if (data.value) {
    if (data.element.dataset.momentFormat) {
      var format = data.element.dataset.momentFormat
    } else {
      var format = "LLLL"
    }

    newValue = moment(data.value).format(format)
    data.element.innerText = newValue
  } else {
    data.element.innerText = ""
  }
}
