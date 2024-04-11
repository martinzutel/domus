import CardGrid from "@/components/cardgrid";
import Searchbar from "@/components/searchbar";
import Topbar from "@/components/topbar";


export default function Home() {
  return (
    <main>
      <Topbar> 
        <Searchbar/>
      </Topbar>

      <CardGrid/>
    </main>
  );
}