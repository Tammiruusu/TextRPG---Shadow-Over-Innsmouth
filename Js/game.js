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
        //PART 1 ALKAA!!
        id: 1,
        text: 'You are enjoying a tour around New England, wishing to go sight-seeing, visit antiquarian and everything in between. You had no car of your own, but using the public transport instead, trains, busses and everything in between. But always using the cheapest option and route available to make your money last. You have arrived outside of station ticket office at New-buryport',
        options: [
            {
                text: 'Head inside the office to figure out where to go from here',
                setState: {information: true},
                nextText: 2,
            },
            {
                text: 'Look outside the office first',
                nextText: 3,
            }

        ]
    },
    {
        id: 2,
        text: 'Inside the station you find a shrew-faced agent, who was symphatetic towards your economy choices. “You could take that old buss, I suppose. It goes through Innsmouth and so many people don’t like it. But it’s cheap enough. Nobody, but those Innsmouth folk uses it. The next shift runs tomorrow morning however.” Innsmouth has not been listed in any of the maps or guides you have browzed on your trip so far. The agent looks like they might have more information about Innsmouth, do you wish to hear it?',
        options: [
            {
                text: 'Hear more about Innsmouth',
                nextText: 4,
            },
            {
                text: 'Head back outside and find the buss',
                nextText: 3,
            },
            {
                text: 'Look around the town instead',
                nextText: 7,
            }  
            ]
    },
    {
        id: 3,
        text: 'You walk outside the station, spotting the dirty grey motor-coach parked there, with barely readable sign on the window. You can spot a balding, sullen man tending to the buss. Talk to him?',
        options: [
            {
                text: 'Approach the Buss driver',
                setState: {information: true},
                nextText: 6,
            },
            {
                text: 'Head inside the Station after all',
                setState: {information: true},
                nextText: 2,
            },
            {
                text: 'Look around the town instead',
                nextText: 7,
            }

        ]
    },
    {
        id: 4,
        text: 'The agent is more than happy to keep talking about Innsmouth. “There are more empty houses than there are people there. And only business in town is fishing and lobstering. There are no mills anymore, except for one gold refinery. The man who owned it used to be really, really rich, but he liked to stay close to his home. I heard he developed some skin disease or deformity late in life and that keeps him out of sight. Grandson to captain Obed Marsh, who founded the business. His mother seems to be some kind of foreigner, they say South Sea islander. Everyone outside of Innsmouth try to hide any family connections to the weird town. Some even whisper about devil worship, that the old captain Marsh made deals with devils and bringing imps to live in Innsmouth. Or about some aweful sacrifices. Some of the old timers call this black reef off the coast, Devil Reef they call it. And that is where the old Captain made his dealings with the deamons. There was also this big epidemic back in the day, where over half of the folks in Innsmouth was carried off. They never did quite figure out what the trouble was with that.” The agent finishes his tales more than happily with all the town gossip they have heard. What do you wish to do next?',
        options: [
            {
                text: 'Head back outside and find the buss',
                nextText: 3,
            },
            {
                text: 'Look around the town',
                nextText: 7,
            },
            {
                text: 'The agent looks like he might have a little more to share',
                nextText: 5,
            }

        ]
    },
    {
        id: 5,
        text: 'You nod along and the agent catches on, adding a few more gossips they have heard about the town. “There is this odd quality to the folks from Innsmouth, you’ll notice it a little in Sargent if you take his bus. Some of the Innsmouth folk have narrow heads with flat noses and bulgy, stary eyes that never seem to shut. Their skin looks rough and scabby, and the side of their neck are all shrivelled or creased up. Get bald, too, very young. I don’t think I have ever seen anyone old that is from Innsmouth. It is odd though how there seems to be plenty of fishes in Innsmouth waters while there is none to go by around the rest of the harbours. There is also a hotel in Innsmouth called the Gilman House. Though there was an inspector friend of mine staying at the hotel a while back, said he heard noises coming from the rest of the rooms. But those rooms were empty. He said he didn’t dare to undress or go to sleep, just waited up and left the first thing in the crack of dawn.” with that the agent finished, where would you like to head next?',
        options: [
            {
                text: 'Head back outside and find the buss',
                nextText: 3,
            },
            {
                text: 'Look around the town',
                nextText: 7,
            }

        ]
    },
    {
        id: 6,
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
        id: 7,
        text: 'You wander around town, when you spot a brilliant looking Historical society. Maybe you find some interesting pieces on display there?',
        options: [
            {
                text: 'Return back to the Ticket Station instead',
                nextText: 4,
            },
            {
                text: 'Visit the Historical Society',
                nextText: 5,
            },
            {
                text: 'Look around town to find a place to stay for the night',
                requiredState: (currentState) => currentState.information, 
                nextText: 11,
            }

        ]
    },
    {
        id: 8,
        text: 'There are strange jewelry on display, claimed to be from Innsmouth. Beneath the jewelry is also a mention, that more specimen are displayed at Miskatonic University in Arkham. As you keep staring at the peculiar jewelry, an odd feeling starts to take over your mind. The large, oddly proportioned thing evidently meant to be a tiara keeps pulling your gaze to it. Approach the Tiara?',
        options: [
            {
                text: 'Ignore the odd sensation at the back of your mind and finish the tour. Head back to ticket Station',
                nextText: 10,
            },
            {
                text: 'Approach the Tiara for a closer look',
                nextText: 9,
            }
        ]
    },
    {
        id: 9,
        text: 'You can feel a gasp escape between your lips at the strange, unearthly splendour of the alien, opulent phantasy that rested there on a purple velvet cushion. Even this close it is hard to describe what you are gazing at. The longer you stare upon the strange tiara, the more it begins to fascinate you and yet there is this feeling of unease at the back of your mind. The patterns of the jewelry all hinted of remote secrets and unimaginable abysses in time and space, and the monotonously aquatic nature of the reliefs became almost sinister. A curator approached you in the midst of gazing so intently at the tiara and provided you with some background information to the piece, given your keen interest in it. “The item was pawned for a ridiculous sum at a shop in State Street, by a drunken Innsmouth man, who was shortly afterwards killed in a brawl. Our fine Society acquired it directly from the pawnbroker and giving it a display worthy of it’s quality. There are talks about devil-worship in Innsmouth, but those are more based on a peculiar, secret cult which had gained force there and engulfed all the churches in the shadowy town. The cult is called The Esoteric Order of DagonII. The townsfolk have been trying to reclaim this piece for some time, but it is part of our collection here.” the curator, Miss Tilton concluded her explanation.',
        options: [
            {
                text: 'With new information, head back to ticket Station to seek a route onwards',
                nextText: 10,
            }
        ]
    },
    {
        id: 10,
        text: 'You arrive back at the ticket Station, the weary, ominous buss still parked there. Do you wish to head inside and talk to the Agent or try and chat with the buss driver?',
        options: [
            {
                text: 'Approach the buss and look for the driver',
                nextText: 6,
            },
            {
                text: 'Head inside the ticket Station and talk to the agent',
                nextText: 2,
            }
        ]
    },
    {
        id: 11,
        text: 'You arrive back at the ticket Station, the weary, ominous buss still parked there. Do you wish to head inside and talk to the Agent or try and chat with the buss driver?',
        options: [
            {
                text: 'Approach the buss and look for the driver',
                nextText: 12,
            }
        ]
        //PART 1 LOPPUU!
    },
    {
        //PART 2 ALKAA!!!
        id: 12,
        text: 'You arrive back at the ticket Station, the weary, ominous buss still parked there. Do you wish to head inside and talk to the Agent or try and chat with the buss driver?',
        options: [
            {
                text: 'Approach the buss and look for the driver',
                nextText: 6,
            },
            {
                text: 'Head inside the ticket Station and talk to the agent',
                nextText: 2,
            }
        ]
    },
    {
        id: 13,
        text: 'You arrive back at the ticket Station, the weary, ominous buss still parked there. Do you wish to head inside and talk to the Agent or try and chat with the buss driver?',
        options: [
            {
                text: 'Approach the buss and look for the driver',
                nextText: 6,
            },
            {
                text: 'Head inside the ticket Station and talk to the agent',
                nextText: 2,
            }
        ]
    },
    {
        id: 14,
        text: 'You arrive back at the ticket Station, the weary, ominous buss still parked there. Do you wish to head inside and talk to the Agent or try and chat with the buss driver?',
        options: [
            {
                text: 'Approach the buss and look for the driver',
                nextText: 6,
            },
            {
                text: 'Head inside the ticket Station and talk to the agent',
                nextText: 2,
            }
        ]
    }
]

startGame()