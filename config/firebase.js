import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDGYiGmEx9JM5iBWjtxQXYuI1avAjafnj4",
  authDomain: "product-metrics-b0f29.firebaseapp.com",
  databaseURL: "https://product-metrics-b0f29-default-rtdb.firebaseio.com",
  projectId: "product-metrics-b0f29",
  storageBucket: "product-metrics-b0f29.appspot.com",
  messagingSenderId: "655173931492",
  appId: "1:655173931492:web:ef894d7c6202d88d8d37f1",
  measurementId: "G-RHGDEG10GJ",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
