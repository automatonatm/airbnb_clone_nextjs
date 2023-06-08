import countries from "world-countries"

//Map true every value and reasign the values
const formattedCounties = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))


const useCountries = () => {


    //return all the formatted countrioes
    const getAll = () => formattedCounties

    //Get the countty by the value passed in as the params
    const getByValue =  (value: string) => {
        return formattedCounties.find((item) => item.value === value)
    }


    return {
        getAll,
        getByValue
    }
}


export default useCountries