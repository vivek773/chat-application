// import "@/styles/globals.css";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store";

// export default function App({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }



import "@/styles/globals.css";
import { Provider, useSelector } from "react-redux";
import { store } from "@/redux/store";

function ThemeWrapper({ children }) {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {children}
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </Provider>
  );
}
