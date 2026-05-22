const textElement = document.getElementById('text');
const optionButtons = document.getElementById('option-buttons');


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

    textNode.option.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () =>  selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption (option) {
    return true
}

function selectOption(option) {

}

const textNodes = [
    {
        id: 1,
        text: 'testi',
        options: [
            {
                text: 'option1',
                setState: {Tavara: true},
                nextText: 2,
            },
            {
                text: 'option2',
                nextText: 2,
            }

        ]
    },
    {
        id: 2 
    }
]

startGame()