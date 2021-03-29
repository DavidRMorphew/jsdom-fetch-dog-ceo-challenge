console.log('%c HI', 'color: firebrick')
const dogImageUl = document.createElement('ul')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'


document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById("dog-image-container")
    imageContainer.appendChild(dogImageUl)
    
    fetchDogImagesAndAddToDom(imgUrl)
    fetchDogBreedsAndAddToDom(breedUrl)
    // fetch(breedUrl)
    // .then(response => response.json())
    // .then(json => {
    //     const dogBreedNames = Object.keys(json.message)
    //     addBreedsIteratively(dogBreedNames)
    //     })
        
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
    
    function fetchDogBreedsAndAddToDom(breedUrl){
        fetch(breedUrl)
        .then(response => response.json())
        .then(json => {
            const dogBreedNames = Object.keys(json.message)
            addBreedsIteratively(dogBreedNames)
            })
            
    }
    

    function addBreedsIteratively(dogBreedNames){
        const breedsUl = document.getElementById('dog-breeds')
        dogBreedNames.forEach(breedName => {
            const li = document.createElement('li')
            breedsUl.appendChild(li)
            li.innerText = breedName.toUpperCase()
        })
    }
    