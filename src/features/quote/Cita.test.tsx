import { rest } from "msw";
import Cita from "./Cita";
import { setupServer } from "msw/node";
import {  render, screen, waitFor } from "../../test/test-utils";
import { API_URL } from "../../app/constants";
import { mockedQuotes } from "../../test/mockedQuotes";
import {  MENSAJE_CARGANDO, NOMBRE_INVALIDO, NO_ENCONTRADO } from "./constants";
import  userEvent  from "@testing-library/user-event";

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
                <Cita/>
            );
            const button = screen.getByText('Obtener cita aleatoria');
            userEvent.click(button);
            const quoteDisplay = await screen.findByText(randomQuote.quote);
            expect(quoteDisplay).toBeInTheDocument();  
        });
    });
    describe("Cuando el usuario ingresa el nombre de un personaje en el input", () => {
        it("Debería mostrar una cita del personaje solicitado", async () => {
            render(
                <Cita/>
            );

            const query = "Abe Simpson";
            const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
            await userEvent.clear(input);
            await userEvent.type(input, query);
            const button = await screen.findByText("Obtener Cita");
            await userEvent.click(button);
            const nameDisplay = await screen.findByText(query);
            expect(nameDisplay).toBeInTheDocument();    
        });
        it("Debería mostrar un mensaje de error al ingresar un número", async () => {
            render(
                <Cita/>
            );

            const query = "56";
            const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
            await userEvent.clear(input);
            await userEvent.type(input, query);
            const button = await screen.findByText("Obtener Cita");
            await userEvent.click(button);
            const errorMessageDisplay = await screen.findByText(NOMBRE_INVALIDO);
            expect(errorMessageDisplay).toBeInTheDocument();    
        });
    });
    describe("Cuando hay una cita desplegada y el usuario clickea en 'Borrar'", () => {
        it("Debería borrar la cita desplegada", async () => {
            render(
                <Cita/>
            );
            const button = screen.getByText('Obtener cita aleatoria');
            await userEvent.click(button);
            const quoteDisplay = await screen.findByText(randomQuote.quote);
            expect(quoteDisplay).toBeInTheDocument(); 
            const deleteButton = screen.getByText('Borrar');
            await userEvent.click(deleteButton);
            await waitFor(() =>{ expect(screen.queryByText(randomQuote.quote)).not.toBeInTheDocument()});                    
        });
    });
  
});