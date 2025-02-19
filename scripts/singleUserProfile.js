import { collection, getDocs , query, where ,  addDoc , Timestamp , orderBy } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";

const singleUserUid = localStorage.getItem("singleUserUid");
console.log(singleUserUid);


const div = document.querySelector(".container-blogs");
const userHeading = document.querySelector(".user-heading")

function render(singleUserBlogs){
  userHeading.innerHTML = singleUserBlogs[0].blogusername + " Blogs";
        singleUserBlogs.map((items) => {
            div.innerHTML += `
           <div class="card">
          <div class="card__header">
            <img src="${items.blogImage}" alt="card__image" class="card__image" width="600">
          </div>
          <div class="card__body">
            <p>${items.caption}</p>
          </div>
          <div class="card__footer">
            <div class="user">
              <img src="${items.profileImage}" alt="user__image" class="user__image" width="40px" height="40px">
              <div class="user__info">
                <h5>${items.blogusername}</h5>
                <small>${items.postTime.toDate()}</small>
              </div>
            </div>
          </div>
        </div>`
        })
}

var singleUserBlogs = [];
async function getSingleUserBlogs(){
    const q = query(collection(db, "blogs"), where("uid", "==", singleUserUid), orderBy("postTime", "desc"));

    var querySnapshot = await getDocs(q);    
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      singleUserBlogs.push({...doc.data(), docId: doc.id });
      
    });
    render(singleUserBlogs)


}

getSingleUserBlogs();