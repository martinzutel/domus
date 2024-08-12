import CardGrid from "@/components/cardgrid";
import Intro from "@/components/intro";
import Searchbar from "@/components/searchbar";
import Topbar from "@/components/topbar";
import { UserProvider } from "@/components/UserContext"; // Import your UserProvider

export default function Home() {
  return (
    <UserProvider> {/* Wrap your components with UserProvider */}
      <main>
        <Topbar> 
          <Searchbar />
        </Topbar>
        <Intro />
        <CardGrid />
      </main>
    </UserProvider>
  );
}
