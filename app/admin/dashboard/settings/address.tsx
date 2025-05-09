/* eslint-disable */

'use client'

import { Input } from '@/components/dashboard/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/dashboard/listbox'
import { getCountries } from '@/data'
import { useState } from 'react'

export function Address() {
  let countries = getCountries()
  let [country, setCountry] = useState(countries[0])

  return (
    <div className="grid grid-cols-2 gap-6">
      <Input
        aria-label="Street Address"
        name="address"
        placeholder="Street Address"
        defaultValue="Property #279-302, Agbogba - Ashongman Rd, Haatso"
        className="col-span-2"
      />
      <Input aria-label="City" name="city" placeholder="City" defaultValue="Greater Accra" className="col-span-2" />
      <Listbox aria-label="Region" name="region" placeholder="Region" defaultValue="Greater Accra">
        {country.regions.map((region) => (
          <ListboxOption key={region} value={region}>
            <ListboxLabel>{region}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
      <Input aria-label="Postal code" name="postal_code" placeholder="Postal Code" defaultValue="A1A 1A1" />
      <Listbox
        aria-label="Country"
        name="country"
        placeholder="Country"
        by="code"
        value={country}
        onChange={(country) => setCountry(country)}
        className="col-span-2"
      >
        {countries.map((country) => (
          <ListboxOption key={country.code} value={country}>
            <img className="w-5 sm:w-4" src="/flags/gh.svg" alt="" />
            <ListboxLabel>{country.name}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  )
}
