 
var ul=document.getElementById('users')
 


function save(e){
    e.preventDefault();
    
    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const phone=document.getElementById('phone').value;

    let myob={
        name,
        email,
        phone 
    }
    axios.post('http://localhost:3000/add-user',myob)
    .then(response=>{
            console.log(response.data);
            
            showuseronscreen(response.data.newUserDetails);
        
    })
    .catch(err=>console.log(err));
    
}
    function showuseronscreen(obj){
    
    var li=document.createElement('li');
    li.className='users-list';
    const name1=obj.name;
    const emailid=obj.email;
    const phone1=obj.phone;
    const id=obj.id;



    li.appendChild(document.createTextNode(name1));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(emailid));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(phone1));
    var btn=document.createElement('button');
    btn.textContent="edit";
    btn.className="btn btn-dark"
    var btn2=document.createElement('button');
    btn2.textContent="delete";
    btn2.className="btn"
    li.id=id;
    btn2.setAttribute("onclick",`ondelete('${id}')`);
    btn.setAttribute("onclick",`onedit('${id}')`);
    li.appendChild(btn);
    li.appendChild(btn2);
    ul.appendChild(li);
    console.log(li);
    }
    
    
    
    //myob_serialized= JSON.stringify(myob);
    //localStorage.setItem(count,myob_serialized);    
    



//li=document.getElementById('users-list');

//li.addEventListener("delete",ondelete);
function ondelete(id1){
    
       
    var childnode=document.getElementById(id1);
    ul.removeChild(childnode);
    //localStorage.removeItem(id1);
    axios.get(`http://localhost:3000/delete-user/:id${id1}`)
    .then(response=>console.log(response.data))
    .catch(e=>console.log(e));
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get('http://localhost:3000/get-user')
    .then(response=>{
        console.log(response.data);
        console.log(response.data.allusers[1]);
        for(var i=0;i<response.data.allusers.length;i++){
            showuseronscreen(response.data.allusers[i]);
        }
    })
})

function onedit(id2){
    axios.get(`http://localhost:3000/users/${id2}`)
    .then(response=>{
        console.log(response.data.uname);
        name1=response.data.uname;
        mail1=response.data.mailid;
        phone1=response.data.phone;
        document.getElementById("name").value=name1;
    document.getElementById("email").value=mail1;
    document.getElementById("phone").value=phone1;
    
    ondelete(id2);
    })
    .catch(e=>console.log(e))
    


}