file = '<...>/caclr/RUE'

File.read(file).each_line do |line|
  relevant = line.encode('UTF-8', invalid: :replace).split('   ').reject { |info| info.empty? }

  street_name = relevant[1].squish
  number = relevant[-2].split(' ').first.gsub('?', '').to_i

  street = Street.find_by(name: street_name)

  if street
    params = {
      street: street,
      number: number
    }

    street_number = StreetNumber.create(params)

    p street_number.inspect
  end
end
