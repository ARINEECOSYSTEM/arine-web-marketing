import Page, { generateMetadata as metadata } from "../[...slug]/page";
const params = Promise.resolve({ slug: ["services"] });
export function generateMetadata() { return metadata({ params }); }
export default function RoutedPage() { return Page({ params }); }
