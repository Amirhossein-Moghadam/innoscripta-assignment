export type NewYorkTimesNews = {
  abstract: string;
  web_url: string;
  uri: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  byline: {
    original: string;
    person: {
      firstname: string;
      middlename: string | null;
      lastname: string;
      qualifier: string | null;
      title: string | null;
      role: string | null;
      organization: string | null;
      rank: number;
    }[];
    organization: string | null;
  };
  multimedia:
    | null
    | {
        credit: string | null;
        rank: number;
        url: string;
        height: number;
        width: number;
        type: string;
        subtype: string | null;
        caption: string | null;
        legacy: any;
        subType: string;
        crop_name: string;
      }[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name?: string;
  type_of_material: string;
  _id: string;
  word_count: number;
  headline: {
    main: string;
    kicker: string | null;
    content_kicker: string | null;
    print_headline: string | null;
    name: string | null;
    seo: string | null;
    sub: string | null;
  };
  keywords?: any;
};
