import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="address-form"
export default class extends Controller {

  static targets = ['city', 'postalCode']

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
          if (this.postalCodeTarget.value == '' || this.postalCodeTarget.value == city.postal_code) {
            const option = document.createElement('option')
            option.innerHTML = city.name
            this.cityTarget.appendChild(option)
          }
        })
      })
  }
}
