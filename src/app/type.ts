export interface Poll {
  id: number;
  question: string; // Which days of week you like?
  results: number[]; // [0,0,0,5,7,8]
  options: string[]; // [Monday, Friday]
  thumbnail: string; // https://image.pngv
  voted: boolean;
}

export interface Voter {
  id: string; // 0xDJASDK312XD
  voted: number[];
}
