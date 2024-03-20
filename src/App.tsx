import { items, videos } from "./data/App";

import { SidebarProvider } from "./contexts/SidebarContext";

import { Pills } from "./components/Pills";
import { PageHeader } from "./layouts/PageHeader";
import { Sidebar } from "./layouts/Sidebar";
import { Video } from "./components/Video";

import { useState } from "react";

export default function App() {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <SidebarProvider>
      <div className=" flex max-h-screen flex-col">
        <PageHeader />
        <div className="flex-grow-1 grid grid-cols-[auto,minmax(0,1fr)] overflow-auto">
          {<Sidebar />}
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 z-10 bg-white pb-4">
              <Pills
                items={items}
                selectedItem={selectedItem}
                onSelectItem={setSelectedItem}
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
              {videos.map((video) => (
                <Video key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
