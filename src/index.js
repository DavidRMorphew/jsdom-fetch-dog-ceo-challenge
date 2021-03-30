console.log('%c HI', 'color: firebrick')
const dogImageUl = document.createElement('ul')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'


document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('breed-dropdown')
    dropdown.innerHTML = `<option value="none">none</option> ${dropdown.innerHTML}`
    const imageContainer = document.getElementById("dog-image-container")
    imageContainer.appendChild(dogImageUl)
    
    fetchDogImagesAndAddToDom(imgUrl)
    fetchDogBreedsAndAddToDom(breedUrl)

    const breedSelect = document.getElementById('breed-dropdown')
    breedSelect.addEventListener('change', event => {
        const selectedLetter = event.target.value
        fetchDogBreedsAndAddToDom(breedUrl, selectedLetter)
    })
    
   
})
    
    function fetchDogImagesAndAddToDom(imgUrl){
        fetch(imgUrl)
        .then(response => response.json())
        .then(json => addDogImagesIteratively(json.message))
    }
    
    function addDogImagesIteratively(dogImageArray){
        dogImageArray.forEach(imgUrl => {
            const li = document.createElement('li')
            dogImageUl.appendChild(li)
            li.innerHTML = `<img src="${imgUrl}">`
        })
    }
    
    function fetchDogBreedsAndAddToDom(breedUrl, selectedLetter = "none"){
        fetch(breedUrl)
        .then(response => response.json())
        .then(json => {
            const dogBreedNames = Object.keys(json.message)
            addBreedsIteratively(dogBreedNames, selectedLetter)
        })    
    }
    
    function addBreedsIteratively(dogBreedNames, selectedLetter){
        if (selectedLetter === "none") {
            addBreedNames(dogBreedNames)    
        } else {
            const SelectedBreeds = filteredResults(dogBreedNames, selectedLetter)
            addBreedNames(SelectedBreeds)
        }
    }
    
    function changeColor(element){
        element.style.color = (element.style.color === "red") ? "black" : "red"
    }

    function filteredResults(dogBreedNames, selectedLetter){
        const selectedBreeds = []
        dogBreedNames.forEach(breedName => {
            if (breedName[0] === selectedLetter) {
                selectedBreeds.push(breedName)
            }
        })
        return selectedBreeds   
    }
    
    function addBreedNames(selectedBreedArray){
        const breedsUl = document.getElementById('dog-breeds')
        breedsUl.innerHTML = ""
        selectedBreedArray.forEach(breedName => {
            const li = document.createElement('li')
            breedsUl.appendChild(li)
            li.innerText = breedName.toUpperCase()
            li.addEventListener('click', event => {
                changeColor(event.target)
            })
        })
    }