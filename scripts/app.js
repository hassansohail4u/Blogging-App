import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";

const div = document.querySelector(".container-blogs")


function render(blogs) {
  // div.innerHTML = "";
  blogs.map((items , index) => {
 
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
                <h5 onclick="singleUserProfile(${index})">${items.blogusername}</h5>
                <small>${items.postTime.toDate()}</small>
              </div>
            </div>
          </div>
        </div>`
  })
}


let allBlogs = [];


async function getAllBlogsFromFirestore() {

  const querySnapshot = await getDocs(collection(db, "blogs"));
querySnapshot.forEach((doc) => {
  allBlogs.push({...doc.data(), docId: doc.id});

});
render(allBlogs)

}


var singleUserUid;

getAllBlogsFromFirestore()





function singleUserProfile(index) {
  console.log(allBlogs[index].uid);
  singleUserUid = allBlogs[index].uid;
  localStorage.setItem("singleUserUid" , singleUserUid)

  window.location = "./singleUserProfile.html"
}




window.singleUserProfile = singleUserProfile
