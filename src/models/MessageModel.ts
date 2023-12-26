export type Data = {
  root: Root;
};

export type Root = {
  data: Message[];
};

export type Message = {
  received: string[];
  from: string[];
  to: string[];
  date: DateElement[];
  mime: MIME[];
  duration: string[];
};

export type DateElement = {
  _: string;
  $: DateClass;
};

export type DateClass = {
  localTime: string;
  timeShift: string;
};

export type MIME = {
  $: Purple;
  mime: MIMEMIME[];
};

export type Purple = {
  class: string;
  estimatedSize: string;
  subtype: string;
  type: string;
};

export type MIMEMIME = {
  $: Fluffy;
};

export type Fluffy = {
  disposition: string;
  'Disposition-filename': string;
  'Disposition-voice': string;
  estimatedSize: string;
  partID: string;
  subtype: string;
  type: string;
};
