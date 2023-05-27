import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/custom.css";
import { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
