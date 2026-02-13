import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      title: "Contenuti",
	  filterFn: (node) => {
		// set containing names of everything you want to filter out
		const omit = new Set(["_index"])
	 
		// can also use node.slug or by anything on node.data
		// note that node.data is only present for files that exist on disk
		// (e.g. implicit folder nodes that have no associated index.md)
		return !omit.has(node.displayName.toLowerCase())
	  },
	  mapFn: (node) => {
		const tagMap = new Map<string, string>();
		tagMap.set("Libro", "📖");
		tagMap.set("Lettera", "✉️");
		tagMap.set("Nota", "📝");
		tagMap.set("Giornale", "📰");
		tagMap.set("Post-it", "🟨");
		tagMap.set("Email", "📧");
		tagMap.set("Mappa", "🗺️");
		tagMap.set("Fotografia", "📷");
		tagMap.set("Quadro", "🖼️");
		tagMap.set("Angelo", "🪽");
		tagMap.set("Uomo", "👨🏻‍💼");
		tagMap.set("Donna", "🙎‍♀️");
		tagMap.set("Puzzle", "🧩");
		
		const folderMap = new Map<string, string>();
		folderMap.set("Stanze", "🏠");
		folderMap.set("Libri", "📚");
		folderMap.set("Documenti", "📓");
		folderMap.set("Luoghi", "📌");
		folderMap.set("Oggetti", "🔎");
		folderMap.set("Lettere", "📫");
		folderMap.set("Quadri", "🖼️");
		folderMap.set("Puzzle", "🧩");
		folderMap.set("Giorni", "📆");
		folderMap.set("Fotografie", "📷");
		
		const tmp = node.data?.tags?.filter((tag) => tagMap.has(tag));
		  
		if (node.isFolder) {
			if(folderMap.has(node.displayName)){
				node.displayName = folderMap.get(node.displayName) + " " + node.displayName;
			}else{
				node.displayName = "📁 " + node.displayName
			}
		}
		else if(tmp.length > 0){
			node.displayName = tagMap.get(tmp[tmp.length - 1]) + " " + node.displayName
		}
		else {
		  node.displayName = "📄 " + node.displayName
		}
	  },
    })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
		title: "Contenuti"
	})),
  ],
  right: [],
}
