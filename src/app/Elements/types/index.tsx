export interface Testimonio {
  name?: string;
  testimonio?: string;
  img?: string;
}

export interface Points {
  icon?: string;
  point?: string;
}

export interface Problem {
  title?: string;
  content?: string;
}

export interface Solution {
  title?: string;
  content?: string;
}

export interface Features {
  title?: string;
  content?: string;
  order?: number;
  button?: string;
  img?: string;
}

export interface PersonalNote {
  img?: string;
  title?: string;
  note?: string;
}

export interface Pricing {
  title?: string;
  price?: number | number[];
  currency?: string;
  description?: string;
  points?: string[];
  textButton?: string;
  redirectTo?: string;
  payType?: { type: string; icon?: string }[];
  icon?: { icon: string; color?: string }[];
}

export interface FAQ {
  question?: string;
  answer?: string;
}

export interface SuccessCasesSection {
  title?: string;
  img?: string;
  description?: string;
}

export interface FinalCTA {
  title?: string;
  description?: string;
  buttonText?: string;
  startRate?: string;
}

export interface PayButton {
  type: string;
  text: string;
  link: string;
  var: string;
}

export interface Product {
  id?: number;
  icon?: string;
  key?: string;
  title?: string;
  price?: number;
  cardPay?: string;
  bgColor?: string;
  currency?: string;
  Bg?: string;
  description?: string;
  before?: boolean;
  order?: number;
  Destacado?: boolean;
  payButtons?: PayButton[];
  proximamente?: boolean;
  testimonios?: Testimonio[];
  points?: Points[];
  details?: boolean;
  video?: string;
  socialText?: string;
  poster?: string;
  problem?: Problem;
  solution?: Solution;
  features?: Features[];
  personalNote?: PersonalNote;
  pricing?: Pricing[];
  faq?: FAQ[];
  SuccessCasesSection?: SuccessCasesSection[];
  finalCTA?: FinalCTA;
}
