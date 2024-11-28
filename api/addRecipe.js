import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const recipesPath = path.join(process.cwd(), 'recipes.json');
        const newRecipe = req.body;

        try {
            // Read the existing recipes
            const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));

            // Add the new recipe
            recipes.push(newRecipe);

            // Write back to the file
            fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2));

            res.status(200).json({ message: 'Recipe added successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to save recipe.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
