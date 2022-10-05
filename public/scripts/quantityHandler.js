const btns = document.querySelectorAll('.input-control')
function change(val){
    let currQuantity = btns[1].value
    currQuantity = Number(currQuantity) + Number(val)
    
    if(currQuantity<=1)
    {
        btns[1].value = 1
        btns[0].disabled = true
    }
    else
    {
        btns[1].value = currQuantity
        btns[0].disabled = false
    }
}