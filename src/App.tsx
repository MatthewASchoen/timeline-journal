import TimelineApp from './views/TimelineApp';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCsny2popHFTGCACCl6y7laCxyq53ZgyYk',
  authDomain: 'journal-timeline.firebaseapp.com',
  projectId: 'journal-timeline',
  storageBucket: 'journal-timeline.appspot.com',
  messagingSenderId: '394086473835',
  appId: '1:394086473835:web:f0f3911c4bca91685d512e',
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

const App = (): JSX.Element => <TimelineApp />;

export default App;
