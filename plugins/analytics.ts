import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZqdPea0kV3-_H-g2vpC2YMtRStOiCC6M",
  authDomain: "splatoon3-shuffle-weapons.firebaseapp.com",
  projectId: "splatoon3-shuffle-weapons",
  storageBucket: "splatoon3-shuffle-weapons.appspot.com",
  messagingSenderId: "245051989191",
  appId: "1:245051989191:web:edb70aedbaee52e3d1b2e2",
  measurementId: "G-J3TS6H6J7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);
