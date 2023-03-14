
async function signup(e){
try{
        
    console.log("hello from signup client")
    
    e.preventDefault();
    const name=document.getElementById('name').value
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value
 
   const res= await axios.post("http://localhost:3000/user/signup",{name,email,password})
  if(res.status===201){
    window.location.href="../Login/login.html"
 }else{
    throw new Error("failed to login")
 }
}catch(err){
        console.log("err from signup client---->"+err)
 } 
     
}