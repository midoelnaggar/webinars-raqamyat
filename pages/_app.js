import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <div className="app">
      <Header />
      <div className="outlet">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
