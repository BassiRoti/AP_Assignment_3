import "@/styles/globals.css";
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/Header';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
