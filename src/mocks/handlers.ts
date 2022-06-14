import { rest } from "msw";
import { Bucket } from "@supabase/storage-js";

import {
  SignUpRequestBody,
  SignUpResponseBody,
  CreateFamilyRequestBody,
  CreateFamilyResponseBody,
  CreateProfileRequestBody,
  CreateProfileResponseBody,
} from "./types";
import { Photo } from "../types/resources";

const baseUrl = "https://ycugklkeqbtlziiutnvx.supabase.co";

export const handlers = [
  rest.post<SignUpRequestBody, any, any>(
    `${baseUrl}/auth/v1/signup`,
    async (req, res, ctx) => {
      const response: SignUpResponseBody = {
        user: {
          created_at: Date.now().toString(),
          email: req.body.email,
          id: "fjdkasfjdkslfl;a",
          app_metadata: {
            provider: "email",
            providers: ["email"],
          },
          aud: "authenticated",
          user_metadata: {},
        },
        session: null,
        error: null,
      };
      const responseSent = await res(
        ctx.status(200),
        ctx.json({ ...response })
      );
      console.log(responseSent);
      return responseSent;
    }
  ),

  rest.post<CreateFamilyRequestBody[], any, CreateFamilyResponseBody[]>(
    `https://ycugklkeqbtlziiutnvx.supabase.co/rest/v1/families`,
    async (req, res, ctx) => {
      try {
        const response: CreateFamilyResponseBody[] = [
          {
            id: "1",
            name: req.body[0].name,
            created_at: req.body[0].created_at.toString(),
            updated_at: req.body[0].updated_at.toString(),
          },
        ];
        return res(ctx.status(201), ctx.json(response));
      } catch (error) {
        console.error(error);
      }
    }
  ),

  rest.post<CreateProfileRequestBody[], any, CreateProfileResponseBody[]>(
    `${baseUrl}/rest/v1/profiles`,
    (req, res, ctx) => {
      const response: CreateProfileResponseBody[] = [
        {
          id: req.body[0].id,
          name: req.body[0].name,
          family_id: req.body[0].family_id,
          isadmin: req.body[0].isadmin,
          updated_at: req.body[0].updated_at,
        },
      ];

      return res(ctx.status(201), ctx.json(response));
    }
  ),

  rest.post(`${baseUrl}/auth/v1/token`, (req, res, ctx) => {
    const response = {
      user: "mockuser",
      session: null,
      error: null,
    };

    return res(ctx.status(200), ctx.json(response));
  }),

  rest.post(
    "https://ycugklkeqbtlziiutnvx.supabase.co/rest/v1/albums",
    (req, res, ctx) => {
      const response = [
        {
          id: "9",
          name: "album 1",
          created_at: new Date(Date.now()),
          user_id: "mockUser123",
        },
      ];

      return res(ctx.status(201), ctx.json(response));
    }
  ),

  rest.get(`${baseUrl}/rest/v1/albums`, (req, res, ctx) => {
    const data = [
      {
        id: 1,
        name: "album 1",
      },
      {
        id: 2,
        name: "album 2",
      },
      {
        id: 3,
        name: "album 3",
      },
    ];
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.post(`${baseUrl}/rest/v1/rpc/search_albums`, (req, res, ctx) => {
    const data = [
      {
        id: 1,
        name: "album 1",
      },
    ];

    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(`${baseUrl}/rest/v1/profiles`, (req, res, ctx) => {
    const data = [
      {
        id: 1,
        name: "Johnny Blanchard",
        isadmin: true,
        updated_at: new Date(Date.now()).toLocaleString(),
        family_id: 25,
      },
    ];
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(`${baseUrl}/rest/v1/photos`, (req, res, ctx) => {
    const data = [
      {
        id: 1,
        path: "example.com",
        title: "photo 1",
        description: "photo 1",
        album_id: 2,
      },
      {
        id: 2,
        path: "example.com",
        title: "photo 2",
        description: "photo 2",
        album_id: 2,
      },
      {
        id: 3,
        path: "example.com",
        title: "photo 3",
        description: "photo 3",
        album_id: 2,
      },
    ];

    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(baseUrl + "/storage/v1/bucket/photos", (req, res, ctx) => {
    const bucket: Bucket = {
      id: "abc123",
      name: "photos",
      owner: "mockuser",
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
      public: false,
    };
    return res(ctx.status(200), ctx.json(bucket));
  }),
  rest.post(baseUrl + "/storage/v1/object/*", (req, res, ctx) => {
    const uploadedPhoto = {
      Key: "mockphoto123",
    };

    return res(ctx.status(201), ctx.json(uploadedPhoto));
  }),
  rest.post(baseUrl + "/rest/v1/photos", (req, res, ctx) => {
    const data: Photo[] = [
      {
        id: "1",
        path: "https://example.com",
        title: "Title 1",
        description: "Description 1",
        user_id: "mockuser123",
        album_id: "25",
      },
    ];

    return res(ctx.status(201), ctx.json(data));
  }),
];
