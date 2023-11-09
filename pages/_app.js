import '@/styles/globals.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

import { ChatAppProvider } from '@/Context/ChatAppContext';
import { NavBar } from '@/Components';
const MyApp = ({ Component , pageProps}) => (
  <div>

    <ChatAppProvider>
    <Component {...pageProps}/>
    
    </ChatAppProvider>

  </div>
);

export default MyApp;