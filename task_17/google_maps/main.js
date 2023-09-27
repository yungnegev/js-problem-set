const API_KEY = 'AIzaSyBWQ338uShQo-RUgTgG1oT5w4CP8v1fdz0'
let autocomplete

const createUrl = (api) => {
    const url = `https://maps.googleapis.com/maps/api/js?key=${api}&libraries=places&callback=initAutocomplete`
    return url
}

const createScript = (url) => {
    const script = document.createElement('script')
    script.src = url
    return script
}

const createInput = () => {
    const input = document.createElement('input')
    input.id = 'autocomplete'
    input.type = 'text'
    input.placeholder = 'введите адрес или место'
    return input
}

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['geocode']
        }
    )
}

const init = () => {
    const url = createUrl(API_KEY)
    const script = createScript(url)
    const input = createInput()
    
    document.body.appendChild(input)
    document.body.appendChild(script)
}

window.onload = init





