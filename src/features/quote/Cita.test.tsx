import { rest } from "msw";
import Cita from "./Cita";
import { setupServer } from "msw/node";
import {  render, screen, waitFor } from "../../test/test-utils";
import { API_URL } from "../../app/constants";
import { mockedQuotes } from "../../test/mockedQuotes";
import { ESTADO_FETCH, MENSAJE_CARGANDO, NO_ENCONTRADO } from "./constants";
import  userEvent  from "@testing-library/user-event";
import { ICita } from "./types";

const randomQuote = mockedQuotes[1].data;
const queries = mockedQuotes.map(m => m.query);

export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
      const character = req.url.searchParams.get('character');
  
      if (character === null) {
        return res(ctx.json([randomQuote]), ctx.delay(150));
      }
  
      if (queries.includes(character)) {
        const quote = mockedQuotes.find((q) => q.query === character);
        return res(ctx.json([quote?.data]));
      }
  
      return res(ctx.json([]), ctx.delay(150));
    }),
  ];
const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe("Componente Cita", () => {
    describe("Cuando renderizamos el componente", () => {
        it("Debería renderizar correctamente", () => {
            render(
                <Cita/>
            );
            
            const button = screen.getByText('Obtener cita aleatoria');
            expect(button).toBeInTheDocument();
        });
        it("Debería mostrar el mensaje 'No se encontro ninguna cita'", () => {
            render(
            <Cita/>
            );
    
            expect(screen.getByText(NO_ENCONTRADO)).toBeInTheDocument();
        });
    });
    describe("Cuando no se envían datos en el input", () => {
        const quote:ICita = {
            personaje: randomQuote.character,
            cita: randomQuote.quote,
            imagen: randomQuote.image,
            direccionPersonaje: randomQuote.characterDirection
          }
        const state = {
            data: quote,
            estado: ESTADO_FETCH.INACTIVO
        }
        it("Debería mostrar el mensaje 'Cargando' cuando la información está siendo solicitada", async () => {
            render(
                <Cita/>
            );
            const button = screen.getByText('Obtener cita aleatoria');
            userEvent.click(button);
            await waitFor(() =>{ expect(screen.getByText(MENSAJE_CARGANDO)).toBeInTheDocument()});    
        });
        it("Debería mostrar una cita aleatoria cuando el usuario hace click en 'Obtener cita aleatoria'", async () => {
            render(
                <Cita/>,
                {
                    preloadedState: {cita: state}
                }
            );
            const button = screen.getByText('Obtener cita aleatoria');
            userEvent.click(button);
            const quoteDisplay = await screen.findByText(quote.cita);
            expect(quoteDisplay).toBeInTheDocument();  
        });
    });
    describe("Cuando el usuario ingresa el nombre de un personaje en el input", () => {
        const quote:ICita = {
            personaje: randomQuote.character,
            cita: randomQuote.quote,
            imagen: randomQuote.image,
            direccionPersonaje: randomQuote.characterDirection
          }
        const state = {
            data: quote,
            estado: ESTADO_FETCH.INACTIVO
        }
        it("Debería mostrar una cita del personaje solicitado", async () => {
            render(
                <Cita/>,
                {
                    preloadedState: {cita: state}
                }
            );

            const query = "Bart Simpson";
            const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
            userEvent.clear(input);
            userEvent.type(input, query);
            const button = await screen.findByText("Obtener Cita");
            userEvent.click(button);
            const nameDisplay = await screen.findByText(query);
            expect(nameDisplay).toBeInTheDocument();    
        });
    });
    describe("Cuando hay una cita desplegada y el usuario clickea en 'Borrar'", () => {
        const quote:ICita = {
            personaje: randomQuote.character,
            cita: randomQuote.quote,
            imagen: randomQuote.image,
            direccionPersonaje: randomQuote.characterDirection
          }
        const state = {
            data: quote,
            estado: ESTADO_FETCH.INACTIVO
        }
        it("Debería borrar la cita desplegada", async () => {
            render(
                <Cita/>,
                {
                    preloadedState: {cita: state}
                }
            );
            const button = screen.getByText('Obtener cita aleatoria');
            userEvent.click(button);
            const quoteDisplay = await screen.findByText(quote.cita);
            expect(quoteDisplay).toBeInTheDocument(); 
            const deleteButton = screen.getByText('Borrar');
            userEvent.click(deleteButton);
            await waitFor(() =>{ expect(screen.queryByText(quote.cita)).not.toBeInTheDocument()});                    
        });
    });
  
});