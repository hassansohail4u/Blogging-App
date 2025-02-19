// console.log("Hello World!");
import { signInWithEmailAndPassword , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth , db} from "./firebaseconfig.js"

// Login In to Blogging App


const formLogin = document.querySelector("#form-login");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");


// get elements from HTML for animation

const div = document.querySelector(".container")
const registerLink = document.querySelector("#register-link")
const loginLink = document.querySelector("#login-link")

registerLink.addEventListener("click" , () => {
  div.classList.add("active")
  
})

loginLink.addEventListener("click" , () => {
  div.classList.remove("active")
  
})

formLogin.addEventListener("submit" , (event) => {
        event.preventDefault();

        console.log(loginEmail.value);
        console.log(loginPassword.value);

        signInWithEmailAndPassword(auth, loginEmail.value , loginPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    window.location = "./index.html"

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage,
    });
  });
 
})








// Sign Up to Blogging App

const formSignup = document.querySelector("#form-register");
const signupUsername = document.querySelector("#signup-username");
const signupEmail = document.querySelector("#signup-email");
const signupPassword = document.querySelector("#signup-password");



let profileImageURL;

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'damqeq8j9', 
  uploadPreset: 'User Profiles'
}, 
  (error, result) => { 
    if (!error && result && result.event === "success") { 
      profileImageURL = result.info.secure_url;      
      
    }
  }
)

document.getElementById("upload_widget").addEventListener("click", function(e){
  e.preventDefault();
  myWidget.open();
}, false);


formSignup.addEventListener("submit" , (event) => {
    event.preventDefault();

    if(profileImageURL == undefined || profileImageURL == ""){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Upload Your Profile Picture",
      });
    }else{

    createUserWithEmailAndPassword(auth, signupEmail.value ,signupPassword.value)
      .then(async(userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log(profileImageURL);
        
    
        try {
            const docRef = await addDoc(collection(db, "users"), {
              username: signupUsername.value,
              email: signupEmail.value,
              profileImage : profileImageURL,
              uid : user.uid
            });
    
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });
              
            console.log("Document written with ID: ", docRef.id);
    
            signupUsername.value = "";
            signupEmail.value = "";
            signupPassword.value = "";
            profileImageURL = "";
          }  catch (e) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: e,
            });
            
            
          }
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
        
      });
    }
    
})