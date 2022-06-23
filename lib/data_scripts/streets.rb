file = '<...>/caclr/TR.DICACOLO.RUCP'

File.read(file).each_line do |line|
  items = line.encode('UTF-8', invalid: :replace).split(' ')

  city = items[3].upcase
  postal_code = items.last
  name = (items - items.first(4) - [postal_code]).join(' ').upcase

  city = City.find_by(name: city, postal_code: postal_code)

  if city
    params = {
      city: city,
      name: name
    }

    street = Street.create(params)

    p street.inspect
  end
end
