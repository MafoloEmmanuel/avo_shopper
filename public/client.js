document.addEventListener('DOMContentLoaded', ()=>{
    const err = document.querySelector('.errorMessage');
    const success = document.querySelector('.success');

    if(err.innerHTML !== '' || success.innerHTML !==''){
       
        setTimeout(()=>{
            err.innerHTML= "";
            success.innerHTML ="";
        },5000)
    }
    console.log('shhhhhhhh')
})