file = '<...>/caclr/CODEPT'

File.read(file).each_line do |line|
  relevant = line.split(' ').first

  params = {
    postal_code: relevant[0, 4],
    name: relevant.gsub(relevant[0, 4], '')
  }

  city = City.create(params)

  p city.inspect
end
