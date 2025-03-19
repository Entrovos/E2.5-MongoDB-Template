/**
 * Import required modules from Express and the model file.
 * - Request and Response are types from Express used for handling HTTP requests and responses.
 * - getOne, getAll, and addOne are functions from the model that interact with the database.
 */
import { Request, Response } from "express";
import {
	getOne,
	getAll,
	addOne,
	updateOnePokemon,
	deleteOne,
	Pokemon,
} from "./model";

/**
 * TODO: Copy the route handling logic from the previous exercise
 * into these functions. You will need to use the data from
 * the model.ts file to handle the requests.
 */

/**
 * Handles the root route.
 * Responds with a simple welcome message.
 */
export const getHome = (req: Request, res: Response) => {
	res.status(200).json({ message: "Hello from the Pokemon Server!" });
};

/**
 * Handles GET requests to /pokemon.
 * Retrieves all Pokemon from the database and sends them as a response.
 */
export const getAllPokemon = async (req: Request, res: Response) => {
	try {
		console.log("Get my all Pokemon");
		const pokemonCollection = await getAll();

		if (pokemonCollection) {
			const pokemon = await pokemonCollection.find().toArray(); // Fetch pokemon as an array

			res.status(200).json({
				success: "Pokemon Collection Found",
				pokemon,
			});
		} else {
			res.status(500).json({
				success: false,
				message: "Pokemon Collection does not exist",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

/**
 * Handles GET requests to /pokemon/:id
 * Fetches a single Pokemon by its ID.
 */
export const getOnePokemon = async (req: Request, res: Response) => {
	try {
		console.log(`Getting one Pokemon by ID `);
		const pokemonId = req.params.id; // Extract ID from request parameters

		const foundPokemon = await getOne(pokemonId); // Get collection

		/** TODO Return appropriate server responses */
		if (foundPokemon) {
			res.status(200).json({
				success: "Pokemon Found",
				foundPokemon,
			});
		} else {
			res.status(500).json({
				success: false,
				message: "Pokemon does not exist",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

/**
 * POST /pokemon - Adds a new Pokemon to the database.
 */
export const createPokemon = (req: Request, res: Response) => {
	try {
		console.log(`Adding a new Pokemon `);
		const newPokemon: Pokemon = req.body;

		addOne(newPokemon);

		/** TODO Return appropriate server responses */
		res.status(201).json({ success: "Pokemon created" });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

/**
 * PUT /pokemon/:id - Updates an existing Pokemon by its ID.
 */
export const updatePokemon = async (req: Request, res: Response) => {
	try {
		/** Complete this section */
		console.log(`Updating an existing Pokemon`);
		const updateId = req.params.id;
		const updateProps = req.body;

		updateOnePokemon(updateId, updateProps);
	} catch (error) {
		console.error("Error updating Pokemon:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

/**
 * DELETE /pokemon/:id - Deletes a Pokemon from the database by its ID.
 */
export const deletePokemon = async (req: Request, res: Response) => {
	try {
		/** Complete this section */
		console.log(`Deleting an existing Pokemon`);
		const deleteId = req.params.id;

		deleteOne(deleteId);
	} catch {
		console.error("Error deleting Pokemon:", Error);
		res.status(500).json({ message: "Internal server error" });
	}
};
