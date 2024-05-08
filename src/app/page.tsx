import CardGrid from "@/components/cardgrid";
import Intro from "@/components/intro";
import Searchbar from "@/components/searchbar";
import Topbar from "@/components/topbar";


export default function Home() {
  return (
    <main>
      <Topbar> 
        <Searchbar/>
      </Topbar>

      <Intro/>

      <CardGrid/>
    </main>
  );
}