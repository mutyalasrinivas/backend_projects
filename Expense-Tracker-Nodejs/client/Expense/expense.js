 

 

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
        if(res.status===200){
            window.alert("success");
            showUserOnScreen(res.data.expense.id);
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