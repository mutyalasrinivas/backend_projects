
async function login(e){
 try{
        e.preventDefault()
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    const res= await axios.post('http://localhost:3000/user/login',{email,password})
    if(res.status===201){
        window.location.href="../Signup/signup.html"
     }else{
        throw new Error("failed to login")
     }
 }catch(err){
          console.log("login err--------->"+err);
 }
     
}