export interface CreateFamilyRequestBody {
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateFamilyResponseBody {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
