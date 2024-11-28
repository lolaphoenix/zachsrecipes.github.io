import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://smftecfffubvgnxfdhyk.supabase.co', // Replace with your Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZnRlY2ZmZnVidmdueGZkaHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3OTMzMzgsImV4cCI6MjA0ODM2OTMzOH0.e_3jDB4acpZkY1BQReCeb5RTmfvBZYbAb2GxbaKAA1o' // Replace with your Supabase anon key
);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newRecipe = req.body;

        try {
            // Insert the new recipe into Supabase
            const { data, error } = await supabase
                .from('recipes')
                .insert([newRecipe]);

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.status(200).json({ message: 'Recipe added successfully!', data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to save recipe to the database.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
