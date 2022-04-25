export interface CreateProfileRequestBody {
  id: string;
  name: string;
  family_id: number;
  isadmin: boolean;
  updated_at: string;
}

export interface CreateProfileResponseBody {
  id: string;
  name: string;
  family_id: number;
  isadmin: boolean;
  updated_at: string;
}
