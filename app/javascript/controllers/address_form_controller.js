import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="address-form"
export default class extends Controller {

  static targets = ['city', 'postalCode', 'street']

  connect() {
    super.connect()
    this.updateCityOptions()
  }

  updateCityOptions() {
    fetch('/cities')
      .then(response => response.json())
      .then((data) => {
        this.cityTarget.innerHTML = ''

        const option = document.createElement('option')
        option.innerHTML = '- enter a postal code above -'
        this.cityTarget.appendChild(option)

        data.cities.forEach((city) => {
          if (this.postalCodeTarget.value == '' || this.postalCodeTarget.value == city.postal_code) {
            const option = new Option(city.name, city.id)
            this.cityTarget.appendChild(option)
          }
        })
      })
  }

  updateStreetOptions() {
    fetch(`/streets?city_id=${this.cityTarget.value}`)
      .then(response => response.json())
      .then((data) => {
        this.streetTarget.innerHTML = ''

        if (data.streets.length > 0) {
          data.streets.forEach((street) => {
            const option = document.createElement('option')
            option.innerHTML = street.name
            this.streetTarget.appendChild(option)
          })
        } else {
          const option = document.createElement('option')
          option.innerHTML = '- no streets -'
          this.streetTarget.appendChild(option)
        }
      })
  }
}
