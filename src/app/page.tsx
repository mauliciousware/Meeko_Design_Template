import { UpperSections } from "@/components/sites/meeko/upper-sections";
import { MiddleSections } from "@/components/sites/meeko/middle-sections";
import { LowerSections } from "@/components/sites/meeko/lower-sections";
import { ReelGallery } from "@/components/sites/meeko/reel-gallery";

export default function Home() {
  return <main><UpperSections /><ReelGallery /><MiddleSections /><LowerSections /></main>;
}
