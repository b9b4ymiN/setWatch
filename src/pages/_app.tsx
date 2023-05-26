import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
