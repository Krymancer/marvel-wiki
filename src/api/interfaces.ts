export interface ResultInterface {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface APIResponse {
  data: {
    count: number;
    results: ResultInterface[];
  };
}
