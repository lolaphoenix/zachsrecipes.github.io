export default async function handler(req, res) {
    const sheetID = '1MVZFjrGrFPU1HJmg_Q5gVUVbFhTT-pZihRV39eYp40M'; // Your actual sheet ID
    const apiKey = process.env.GOOGLE_API_KEY; // Accessing the API key from environment variables

    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Sheet1!A:I?key=${apiKey}`);
        const data = await response.json();
        
        if (response.ok) {
            res.status(200).json(data);
        } else {
            res.status(response.status).json({ error: data.error });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}