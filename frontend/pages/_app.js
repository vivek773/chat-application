// import "@/styles/globals.css";
// import { Provider, useSelector } from "react-redux";
// import { store } from "@/redux/store";

// function ThemeWrapper({ children }) {
//   const theme = useSelector((state) => state.theme.theme);

//   return (
//     <div className={theme === "dark" ? "dark" : ""}>
//       {children}
//     </div>
//   );
// }

// export default function App({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <ThemeWrapper>
//         <Component {...pageProps} />
//       </ThemeWrapper>
//     </Provider>
//   );
// }


import "@/styles/globals.css";
import { Provider, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useSocket } from "@/hooks/useSocket";

function ThemeWrapper({ children }) {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {children}
    </div>
  );
}

function AppWrapper({ Component, pageProps }) {
  // Initialize WebSocket once app loads
  useSocket();

  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <AppWrapper Component={Component} pageProps={pageProps} />
      </ThemeWrapper>
    </Provider>
  );
}
