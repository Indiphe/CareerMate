document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const toggleBtn = document.getElementById('auth-toggle-btn');
  const toggleText = document.getElementById('auth-toggle-text');
  const title = document.getElementById('auth-title');
  const subtitle = document.getElementById('auth-subtitle');

  let isLogin = true;

  // Toggle between login and register forms
  toggleBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
    title.textContent = isLogin ? 'Welcome Back' : 'Create Account';
    subtitle.textContent = isLogin
      ? 'Log in to your CareerMate account'
      : 'Join CareerMate by creating an account';
    toggleText.textContent = isLogin
      ? "Don't have an account? "
      : "Already have an account? ";
    toggleBtn.textContent = isLogin ? 'Sign Up' : 'Log In';
  });

  // Login
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorBox = document.getElementById('login-error');

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = auth.currentUser;
        if (user.emailVerified) {
          window.location.href = 'Home.html';
        } else {
          auth.signOut();
          errorBox.textContent = 'Please verify your email before logging in.';
        }
      })
      .catch(error => {
        errorBox.textContent = error.message;
      });
  });

  // Register
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('confirm-password').value;
    const errorBox = document.getElementById('register-error');

    if (password !== confirm) {
      errorBox.textContent = 'Passwords do not match.';
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        return user.updateProfile({ displayName: name }).then(() => {
          return db.collection("users").doc(user.uid).set({
            name: name,
            email: email,
            role: "job_seeker",
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          }).then(() => {
            return user.sendEmailVerification();
          });
        });
      })
      .then(() => {
        alert("Account created! A verification email has been sent.");
        isLogin = true;
        toggleBtn.click();
      })
      .catch(error => {
        errorBox.textContent = error.message;
      });
  });

  // Password toggle
  window.toggleVisibility = function (id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
  };
  const uploadBtn = document.getElementById("upload-btn");
const fileInput = document.getElementById("cv-file");
const cvStatus = document.getElementById("cv-status");

uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file || file.type !== "application/pdf") {
    cvStatus.textContent = "Please upload a PDF file.";
    return;
  }

  cvStatus.textContent = "Uploading...";

  const cloudName = "your-cloud-name"; // Replace with your Cloudinary cloud name
  const unsignedPreset = "your-upload-preset"; // Replace with your preset

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    const fileURL = data.secure_url;
    cvStatus.textContent = "Uploaded! Analyzing CV...";

    // Start extracting PDF content
    extractPDFText(file, (text) => {
      const skills = extractSkillsFromText(text);
      cvStatus.innerHTML = `<strong>Extracted Skills:</strong> ${skills.join(', ')}`;
      // TODO: match against job list
    });
  } catch (err) {
    console.error(err);
    cvStatus.textContent = "Failed to upload CV.";
  }
});
function extractPDFText(file, callback) {
  const reader = new FileReader();
  reader.onload = function () {
    const typedArray = new Uint8Array(reader.result);
    pdfjsLib.getDocument(typedArray).promise.then(async function (pdf) {
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += pageText + " ";
      }
      callback(fullText);
    });
  };
  reader.readAsArrayBuffer(file);
}

function extractSkillsFromText(text) {
  const knownSkills = ["JavaScript", "Python", "React", "Node.js", "Firebase", "SQL", "Machine Learning", "Git"];
  const lowerText = text.toLowerCase();
  return knownSkills.filter(skill => lowerText.includes(skill.toLowerCase()));
}

});
