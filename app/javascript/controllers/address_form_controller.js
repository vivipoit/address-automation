import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="address-form"
export default class extends Controller {

  static targets = ['city']

  connect() {
    super.connect()
    this.updateCityOptions()
  }

  updateCityOptions() {
    fetch('/cities')
      .then(response => response.json())
      .then((data) => {
        this.cityTarget.innerHTML = ''

        data.cities.forEach((city) => {
          const option = document.createElement('option')
          option.innerHTML = city.name
          this.cityTarget.appendChild(option)
        })
      })
  }
}
