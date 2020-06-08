function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())  // função com retorno.
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value 

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    


    const url =  `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` 
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())  // função com retorno.
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

    citySelect.disabled = false
    })
}


document.querySelector("select[name=uf]")
        .addEventListener("change", getCities)




// itens de coleta
// pegar todos os lis
const itensToCollect = document.querySelectorAll(".items-grid li")

for(const item of itensToCollect){
    item.addEventListener("click", handlSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handlSelectedItem(event){
    const itemLi = event.target

    // adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected") // toggle = adicionar ou remover

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    }) 
    // se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent 
        })
        
        selectedItems = filteredItems
    }else {
        // se não tiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }
    console.log('selectedItems: ', selectedItems)
    
    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}
   
