
async function login(e){
 try{
        e.preventDefault()
     const email=document.getElementById("email").value;
     const password=document.getElementById("password").value;
     
     const res= await axios.post('http://localhost:3000/user/login',{email,password})
      if(res.status===404){
        window.location.href="../Signup/signup.html"
      }else if(res.status===401){
        throw new Error("you entered invalid password.....")
      }
      else{
        return window.location.href="../Expense/expense.html";
       }
         
    
      
   }catch(err){
          console.log(err);
 }
     
}