export type NewYorkTimesNews = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: "Article" | "Interactive";
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia:
    | null
    | {
        url: string;
        format: string;
        height: number;
        width: number;
        type: "image";
        subtype: "photo";
        caption: string;
        copyright: string;
      }[];
  short_url: string;
};
