savePage=document.getElementById('page-size').value
const pagination = {
    currentPage: 1,
    itemsPerPage:savePage
  };
 
 



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

//2

// const showUserOnScreen=(obj)=>{
//     const parentEle = document.getElementById("list");
//     const childEle = document.createElement('li');
//     childEle.id=obj.id;
//     childEle.className="items"
//     childEle.textContent= "MRP."+obj.money +" --- "+ obj.description+" --- " + obj.category;
//     const deleteBtn=document.createElement('input');
//     deleteBtn.type='button';
//     deleteBtn.value='Delete Expense';
//     deleteBtn.setAttribute('onclick',`deleteExpense('${childEle.id}')`)

//     childEle.appendChild(deleteBtn); 
//     parentEle.appendChild(childEle);
// }
 
const showUserOnScreen = (obj) => {
    const parentEle = document.getElementById("list");
    const childEle = document.createElement("li");
    childEle.id = obj.id;
    childEle.className = "items";
    childEle.textContent =
      "MRP." +
      obj.money +
      " --- " +
      obj.description +
      " --- " +
      obj.category;
    const deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.value = "Delete Expense";
    deleteBtn.setAttribute("onclick", `deleteExpense('${childEle.id}')`);
  
    childEle.appendChild(deleteBtn);
    parentEle.appendChild(childEle);
  
    // Update pagination object
    const totalExpenses = parentEle.childElementCount;
    pagination.totalPages = Math.ceil(totalExpenses / pagination.itemsPerPage);
  
    // Show only the expenses for the current page
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    for (let i = 0; i < totalExpenses; i++) {
      parentEle.children[i].style.display =
        i >= start && i < end ? "block" : "none";
    }
  
    // Update page navigation buttons
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    prevBtn.disabled = pagination.currentPage === 1;
    nextBtn.disabled = pagination.currentPage === pagination.totalPages;
    const pageInfo = document.getElementById("page-info");
    pageInfo.textContent = `Page ${pagination.currentPage} of ${pagination.totalPages}`;
  };
//3
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

prevBtn.addEventListener("click", () => {
  pagination.currentPage--;
  showUserOnScreen({});
});

nextBtn.addEventListener("click", () => {
  pagination.currentPage++;
  showUserOnScreen({});
});

//4 
async function deleteExpense(id){
    try{
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/expense/expenses/${id}`, {
            headers: {
              "Authorization":token
            }
        })
        const childEle = document.getElementById(id);
        const parentEle=document.getElementById("list");
        parentEle.removeChild(childEle);
    }catch(err){
        console.log(err);
    }    
}

async function download() {
    try {
           const token = localStorage.getItem("token");
           const response = await axios.get('http://localhost:3000/expense/download', { headers: { "Authorization": token } });
            if (response.status === 200) {
           var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
             a.click();

           } else {
               throw new Error(response.data.message);
            }
        } catch (err) {
               window.alert(err);
            }
}

async function downloadFileList(){
    
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get('http://localhost:3000/expense/downloadlist', {
            headers: { "Authorization": token }
          });
          if (response.status === 200) {
            const downloadedFiles = response.data.downloads;
            console.log(downloadedFiles);
             // Display the list of downloaded files on the screen
          const downloadList = document.getElementById("download-list");
         downloadList.innerHTML = "";
         for (let i = 0; i < downloadedFiles.length; i++) {
          const fileLink = document.createElement("a");
            fileLink.href = downloadedFiles[i].fileURL;
          fileLink.textContent = downloadedFiles[i].fileName;
          downloadList.appendChild(fileLink);
          downloadList.appendChild(document.createElement("br"));
      }
             
          } else {
            throw new Error(response.data.message);
          }
        } catch (err) {
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

 


 
 