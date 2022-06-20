import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="address-form"
export default class extends Controller {

  static targets = ['city', 'postalCode', 'street', 'number']

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
            const option = new Option(city.name, city.id)
            this.cityTarget.appendChild(option)
          }
        })

        this.updateStreetOptions()
      })
  }

  updateStreetOptions() {
    fetch(`/streets?city_id=${this.cityTarget.value}`)
      .then(response => response.json())
      .then((data) => {
        this.streetTarget.innerHTML = ''

        if (data.streets.length > 0) {
          data.streets.forEach((street) => {
            const option = new Option(street.name, street.id)
            this.streetTarget.appendChild(option)
          })
        } else {
          const option = document.createElement('option')
          option.innerHTML = '- no streets -'
          this.streetTarget.appendChild(option)
        }

        this.updateNumberOptions()
      })
  }

  updateNumberOptions() {
    fetch(`/street_numbers?street_id=${this.streetTarget.value}`)
      .then(response => response.json())
      .then((data) => {
        this.numberTarget.innerHTML = ''

        if (data.street_numbers.length > 0) {
          data.street_numbers.forEach((street_number) => {
            const option = document.createElement('option')
            option.innerHTML = street_number.number
            this.numberTarget.appendChild(option)
          })
        } else {
          const option = document.createElement('option')
          option.innerHTML = '- no numbers -'
          this.numberTarget.appendChild(option)
        }
      })
  }
}
