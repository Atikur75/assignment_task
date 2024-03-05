import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import '@/assets/css/style.css'
import '@/assets/css/dropdownmenu.css'
import '@/assets/css/sidebar.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
