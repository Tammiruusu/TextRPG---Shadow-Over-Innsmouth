const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


let state = {}

function startGame() {

    //Pelin alussa state on tyhjä, uusi peli alkaa, ei ole NewGame+
    state = {}
    showTextNode(1)

}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}



//Tämä näyttää joko NULLIN, jos sinulla ei ole tarvittavaa tavaraa tai näyttää 
//optionit jos sinulla on tarvittavat tavarat. 
function showOption (option) {
    return option.requiredState == null || option.requiredState(state)
}


//Tällä saadaan tavarat mukaan STATEEN ja jos halutaan pois sulkea joitain 
//OPTIONEJA, jos ei ole tarvittavaa tavaraa mukana. 
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if(nextTextNodeId <= 0) {
        return startGame()
    }
    //state ylikirjoittaa setStaten, mikäli saat tavaran tai menetätä tavaran
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'edessässi on tavara',
        options: [
            {
                text: 'ota tavara',
                setState: {Tavara: true},
                nextText: 2,
            },
            {
                text: 'älä ote tavaraa',
                nextText: 2,
            }

        ]
    },
    {
        id: 2,
        text: 'myyjä, vaihdatko tavaran?',
        options: [
            {
                text: 'vaihda tavara itemiin',
                requiredState: (currentState) => currentState.Tavara,
                setState: { tavara: false, item: true },
                nextText: 3,
            },
            {
                text: 'vaihda tavara tokeniin',
                requiredState: (currentState) => currentState.Tavara,
                setState: { tavara: false, token: true },
                nextText: 3,
            },
            {
                text: 'Älä vaihda mitään',
                nextText: 3,
            }  
            ]
    },
    {
        id: 3,
        text: 'olet väsynyt kaiken seikkailun jälkeen',
        options: [
            {
                text: 'tutki kuitenkin enemmän',
                nextText: 4,
            },
            {
                text: 'käy nukkumaan maahan',
                nextText: 5,
            },
            {
                text: 'etsi läheinen kaupunki ja nuku',
                nextText: 6,
            }

        ]
    },
    {
        id: 4,
        text: 'Olet niin väsynyt, että nukahdat ja monsteri syö sinut',
        options: [
            {
                text: 'Aloita uudestaan',
                nextText: -1
            }

        ]
    }
]

startGame()