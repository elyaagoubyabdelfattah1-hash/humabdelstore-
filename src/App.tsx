import Header from "./components/Header";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import WhyUs from "./components/WhyUs";
import Closing from "./components/Closing";
import Footer from "./components/Footer";
import Admin from "./components/Admin";

export default function App() {
  if (window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/")) return <Admin />;
  return <><Header /><main><Hero /><Collection /><WhyUs /><Closing /></main><Footer /></>;
}
