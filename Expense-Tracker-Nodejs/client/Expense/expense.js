 

 

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
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{ headers:{"Authorization":token}})

            alert('you are a Premium User Now')
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

async function getdata(){
    try{
        const token= localStorage.getItem('token')
        const result = await axios.get('http://localhost:3000/expense/allexpenses', {headers : {"Authorization": token}})  
        console.log(result);
        for(var i=0;i<result.data.allexpenses.length;i++){
            showUserOnScreen(result.data.allexpenses[i]);

        }
    }catch(err){
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded',getdata)