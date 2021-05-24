export interface ResultInterface {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

export interface APIResponse {
  data: {
    results: ResultInterface[];
  }
}

