import Header from "./components/Header";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import WhyUs from "./components/WhyUs";
import Closing from "./components/Closing";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Collection />
        <WhyUs />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
