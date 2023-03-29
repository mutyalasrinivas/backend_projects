
let currentPage = 1;
let rowsPerPage = localStorage.getItem('rowsPerPage')?localStorage.getItem('rowsPerPage'):5;

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
 
async function download() {
  try {
         const token = localStorage.getItem("token");
         const response = await axios.get('http://localhost:3000/expense/download', { headers: { "Authorization": token } });
          if (response.status === 200) {
             console.log(response);
           const a = document.createElement("a");
          a.href = response.data.fileURL;
          a.download = 'myexpense.csv';
           a.click();

         } else {
             throw new Error(response.data.message);
          }
      } catch (err) {
             console.log(err);
          }
}

function showPremiumuserMessage(){
  document.getElementById('rzp-button1').style.visibility="hidden"
  document.getElementById('message').innerHTML="you are premium user"
} 
function showDownloadButtons(){
  document.getElementById('downloadexpense').style.visibility='visible'
  document.getElementById('downloadlist').style.visibility='visible'
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
  
  document.addEventListener('DOMContentLoaded', getExpenses); 

 

async function showUserOnScreen(expense){
  try{
    const parentEle = document.getElementById("listOfExpense");
    const childEle = document.createElement('li');
    childEle.id=expense.id;
    childEle.className="items"
    childEle.textContent= "MRP."+expense.money +" --- "+ expense.description+" --- " + expense.category;
    const deleteBtn=document.createElement('input');
    deleteBtn.type='button';
    deleteBtn.value='Delete Expense';
    deleteBtn.setAttribute('onclick',`deleteExpense('${childEle.id}')`)

    childEle.appendChild(deleteBtn); 
    parentEle.appendChild(childEle);
  }catch(error){
      console.log("showonscreen error",error);
  } 
    
}

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
        const parentEle=document.getElementById("listOfExpense");
        parentEle.removeChild(childEle);
    }catch(err){
        console.log(err);
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
  
async function pagination(totalCount) {
  try {
    const maxPages = Math.ceil(totalCount / rowsPerPage);
    document.getElementById('prev-btn').style.display = currentPage > 1 ? "block" : "none";
    document.getElementById('next-btn').style.display = maxPages > currentPage ? "block" : "none";
    document.getElementById('rows-per-page').value = rowsPerPage;
    const start = (currentPage - 1) * rowsPerPage + 1;
    const temp = start + Number(rowsPerPage) - 1;
    const end = temp < totalCount ? temp : totalCount;
    document.getElementById('page-details').textContent = `Showing ${start}-${end} of ${totalCount}`;
  } catch (error) {
    console.error(error);
  }
  
  document.getElementById('prev-btn').onclick = function() {
    showPreviousPage(totalCount);
  };
  
  document.getElementById('next-btn').onclick = function() {
    showNextPage(totalCount);
  };
}

async function getExpenses() {
  // fetch data from server here and update the UI
  document.getElementById("listOfExpense").innerHTML = "";
  try{
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    const ispremiumuser = decodedToken.ispremiumuser;
    if(ispremiumuser){
        showPremiumuserMessage();
        showLeaderboard();
        showDownloadButtons();
    };
    const response = await axios.get(`http://localhost:3000/expense/allexpenses?page=${currentPage}&rows=${rowsPerPage}`, { headers: {'Authorization': token}})
   document.getElementById('listOfExpenses').innerHTML = "";
   const { expenses, totalCount } = response.data;
   pagination(totalCount);
   if (expenses.length > 0) {
       for (let i = 0; i < expenses.length; i++) {
        showUserOnScreen(response.data.expenses[i]);
       }
   } else {
       document.getElementById('err').textContent = "Currently there are no Expenses!"
   }
} catch (error) {
   console.log(error);
}
}

async function showChangedRows() {
  try {
    rowsPerPage = event.target.value;
    localStorage.setItem('rowsPerPage', rowsPerPage);
    location.reload();
  } catch (error) {
    console.error(error);
  }
}

async function showPreviousPage(totalCount) {
  try {
    currentPage--;
    await getExpenses();
    pagination(totalCount); // call pagination function after fetching data
  } catch (error) {
    console.error(error);
  }
}

async function showNextPage(totalCount) {
  try {
    currentPage++;
    await getExpenses();
    pagination(totalCount); // call pagination function after fetching data
  } catch (error) {
    console.error(error);
  }
}
