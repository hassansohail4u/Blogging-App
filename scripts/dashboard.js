import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, getDocs , query, where ,  addDoc , Timestamp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth , db} from "./firebaseconfig.js";


const loginBtnDiv = document.querySelector("#loginBtnDiv")
const loginUser = document.querySelector("#loginUser")
const userName = document.querySelector("#userName")
const userProfile = document.querySelector("#userProfile")
const logOutBtn = document.querySelector("#logOutBtn")
const formSubmit = document.querySelector("#form-submit")
const caption = document.querySelector("#caption")
const div = document.querySelector(".container-blogs")

let userProfileImage;
onAuthStateChanged(auth, async(user) => {
    if (user) {
      const uid = user.uid;
      
      loginBtnDiv.classList.add("d-none");
      loginUser.classList.remove("d-none")
      var user = await getDataFromFirestore();
      getBlogsFromFirestore()
      
      userName.innerHTML = "Hello " + user.username;
      userProfile.src = user.profileImage

      userProfileImage = user.profileImage
      
      
    } else {
      window.location = "./login.html"

    }
  })

  let user;
  var username;

async function getDataFromFirestore() {

    const q = query(collection(db, "users") , where("uid", "==", auth.currentUser.uid));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    user = doc.data();


    });
username = user.username


        return user

}




logOutBtn.addEventListener("click" , () => {

    signOut(auth).then(() => {
        window.location = "./login.html"

      }).catch((error) => {
        alert(error)
      });
      
})

let blogImageURL;
let blogs = [];

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'damqeq8j9', 
  uploadPreset: 'User Profiles'
}, 
  (error, result) => { 
    if (!error && result && result.event === "success") { 
      blogImageURL = result.info.secure_url;      
      
    }
  }
)

document.getElementById("upload_widget").addEventListener("click", function(e){
  e.preventDefault();
  myWidget.open();
}, false);


formSubmit.addEventListener("submit" , async(event) => {
    div.innerHTML = "";
    
    event.preventDefault();
    console.log(caption.value);
    console.log(blogImageURL);

    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        blogusername: username,
        caption: caption.value,
        blogImage: blogImageURL,
        uid: auth.currentUser.uid,
        postTime: Timestamp.fromDate(new Date()),
        profileImage : userProfileImage
        
      });
      blogs.push({
        blogusername: username,
        caption: caption.value,
        blogImage: blogImageURL,
        uid: auth.currentUser.uid,
        postTime: Timestamp.fromDate(new Date()),
        docId: docRef.id,
        profileImage : userProfileImage

    })
    console.log(blogs);
 render(blogs)

    
      console.log("Document written with ID: ", docRef.id);

      caption.value = "";
      blogImageURL = "";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
})


function render(blogsarr) {
  
 blogsarr.map((items) => {
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


async function getBlogsFromFirestore() {
    blogs = [];

    const q = await query(collection(db, "blogs") , where("uid", "==", auth.currentUser.uid));


   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
    blogs.push({...doc.data() , docId: doc.id , blogusername : username})
  
});
  render(blogs)
 
}


