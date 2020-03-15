const form=document.getElementById('form');
const username=document.getElementById('username');
const email= document.getElementById('email');
const password= document.getElementById('password');
const password2=document.getElementById('password2');


//Show input error message
const showError=(input,message)=>{
    const formControl=input.parentElement;
    formControl.className="form-control error";
    const small=formControl.querySelector('small');
    small.innerText=message;
}

//Show success outline
const showSuccess=(input)=>{
    const formControl=input.parentElement;
    formControl.className='form-control success';
}

const checkRequired=(inputArr)=>{
    inputArr.forEach((input)=>{
        if(input.value.trim()===""){
            showError(input,`${getFieldName(input)} is required`);
        }else{
            showSuccess(input);
        }
    })
}

//Get fieldName
const getFieldName=(input)=>{
    
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

const checkEmail = (input) =>{
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(pattern.test(String(input.value.toLowerCase().trim()))){
        showSuccess(input);
    }else{
        showError(input,'Email is not valid');
    }
}

const checkLength = (input,min,max) =>{
    if(input.value.length<min){
        showError(input,`${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length>max){
        showError(input,`${getFieldName(input)} must be at less ${max} characters`);
    }else{
        showSuccess(input);
    }
}

const checkPasswordsMatch=(input,input2)=>{
    if(input.value!==input2.value){
        showError(input2,'Password do not match');
    }
}





form.addEventListener('submit',(e)=>{
    e.preventDefault();
    checkRequired([username,email,password,password2]);
    checkEmail(email);
    checkLength(password,6,25);
    checkPasswordsMatch(password,password2);
})