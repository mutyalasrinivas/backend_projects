 
 const postData = async (e) => {
  try {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    let obj = {
      amount,
      description,
      category
    }
    await axios.post('http://localhost:3000/add', obj);
    showUserOnScreen(obj)
  }
  catch (err) {
    console.log("err----->post --->" + err);
  }
}

const showUserOnScreen=(obj)=> {
  const parentEle=document.getElementById('listOfitems')
  const childEle =document.createElement('li')
   
  childEle.id=obj.id;
  childEle.textContent= obj.amount +'-'+obj.description + '-'+obj.category
  const deleteBtn =document.createElement('input')
  deleteBtn.type='button'
  deleteBtn.value='Delete Expense'
  deleteBtn.setAttribute('onclick',`deleteEle('${childEle.id}')`)
  childEle.appendChild(deleteBtn)
  parentEle.appendChild(childEle)
 
        
}
const deleteEle=async(id1)=>{
  try{
    await axios.post(`http://localhost:3000/delete/${id1}`)
    
     const childnode= document.getElementById(id1);
     const parentEle=document.getElementById('listOfitems') ;
     parentEle.removeChild(childnode);
     console.log("succesfully deleted");
    
     
  }catch(err){
    console.log("err delete req---->"+err);
  }
    
}
 
const getdata=async()=>{
  try{
    const res=await axios.get('http://localhost:3000/list');
   
     console.log("response--->>>"+res);
      
     for(var i=0;i<res.data.allexpenses.length;i++){
      showUserOnScreen(res.data.allexpenses[i]);
     }
   }
 
  catch(err){
     console.log("error in getting data:------>>>>>"+err);
  }
}
window.addEventListener("DOMContentLoaded",getdata);