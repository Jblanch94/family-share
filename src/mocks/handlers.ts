import { rest } from "msw";

import {
  SignUpRequestBody,
  SignUpResponseBody,
  CreateFamilyRequestBody,
  CreateFamilyResponseBody,
  CreateProfileRequestBody,
  CreateProfileResponseBody,
} from "./types";

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

  rest.post(`${baseUrl}/rest/v1/albums`, (req, res, ctx) => {
    const response = [
      {
        id: "9",
        name: "album 1",
        created_at: new Date(Date.now()),
        user_id: "mockUser123",
      },
    ];

    return res(ctx.status(201), ctx.json(response));
  }),
];
