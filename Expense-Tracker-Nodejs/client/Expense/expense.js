
async function addExpense(event){
    try{
        event.preventDefault();
       const money = document.getElementById("money").value
       const description=document.getElementById("description").value
       const category = document.getElementById("category").value
       const obj = {
        money,
        description,
        category
       }
       const token = localStorage.getItem('token') 
        const res = await axios.post('http://localhost:3000/expense/addexpense',obj,{headers: {"Authorization": token}})
        console.log('ressssssss',res)
        if(res.status===200){
            window.alert("success");
            showUserOnScreen(obj);
        }else{
             throw new Error("failed to send expense details")
        }
    }catch(err){
        console.log(err);
    }
}

const showUserOnScreen=(obj)=>{
    const parentEle = document.getElementById("list");
    const childEle = document.createElement('li');
    childEle.id=obj.id;
    childEle.className="items"
    childEle.textContent= "MRP."+obj.money +" --- "+ obj.description+" --- " + obj.category;
    const deleteBtn=document.createElement('input');
    deleteBtn.type='button';
    deleteBtn.value='Delete Expense';
    deleteBtn.setAttribute('onclick',`deleteExpense('${childEle.id}')`)

    childEle.appendChild(deleteBtn); 
    parentEle.appendChild(childEle);
}
 
async function deleteExpense(id){
    try{
        await axios.delete(`http://localhost:3000/expense/expenses/${id}`)
        const childEle = document.getElementById(id);
        const parentEle=document.getElementById("list");
        parentEle.removeChild(childEle);
    }catch(err){
        console.log(err);
    }
    
}

document.getElementById('rzp-button1').onclick = async function(e){
    const token = localStorage.getItem('token')
    const response=await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{"Authorization":token}});
    console.log(response);
    var options = 
    {
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        //this handler function handles the success payment
        "handler":async function(response){
           const res= await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{ headers:{"Authorization":token}})
            console.log(res)
            alert('you are a Premium User Now')
            document.getElementById('rzp-button1').style.visibility="hidden"
            document.getElementById('message').innerHTML="you are premium user"
            localStorage.setItem('token',res.data.token)
            showLeaderboard()
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function(response){
        console.log(response)
        alert('Something went wrong')
    });
}

function showPremiumuserMessage(){
    document.getElementById('rzp-button1').style.visibility="hidden"
    document.getElementById('message').innerHTML="you are premium user"
} 

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showLeaderboard(){
    const inputElement = document.createElement("input")
    inputElement.type="button"
    inputElement.value='Show Leaderboard'
    inputElement.onclick=async()=>{
        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard',{headers:{"Authorization":token}})
        console.log(userLeaderBoardArray)
        var leaderboardElem = document.getElementById('leaderboard')
        leaderboardElem.innerHTML+='<h1> Leader Board</h1>'
        userLeaderBoardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML+=`<li>Name - ${userDetails.name} Total Expenses - ${userDetails.totalExpenses  } `
        });

    }
    document.getElementById("message").appendChild(inputElement);
}

window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const token= localStorage.getItem('token')
        const decodeToken = parseJwt(token)
        console.log(decodeToken)
        const ispremiumuser = decodeToken.ispremiumuser
        if(ispremiumuser){
           showPremiumuserMessage()
           showLeaderboard()
        }
        const result = await axios.get('http://localhost:3000/expense/allexpenses', {headers : {"Authorization": token}})  
        console.log(result);
        for(var i=0;i<result.data.allexpenses.length;i++){
            showUserOnScreen(result.data.allexpenses[i]);

        }
    }catch(err){
        console.log(err);
    }
})

 