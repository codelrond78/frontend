import initFontAwesome from "./utils/initFontAwesome";

// Init fonts
initFontAwesome();

// Test mocks
require("jest-fetch-mock").enableMocks();

import { graphql } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
  graphql.query('school', (req, res, ctx) => {

    return res(
      ctx.data({
        school: {
          headers: req.headers._headers,
          id: 0,
          name: "nuestra señora de la salud"
        },
      }),
    )
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
