/* eslint-env node */
// import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { zipCode: _zipCode } = req.query;

  try {
    // This is a placeholder - you'll want to integrate with a real API
    // like Google Civic Information API or OpenStates API
    const mockRepresentatives = [
      {
        name: 'John Doe',
        office: 'City Council District 4',
        address: '175 E 2nd St, Tulsa, OK 74103',
        email: 'councilor.district4@tulsacouncil.org'
      },
      {
        name: 'Jane Smith',
        office: 'State Representative',
        address: '2300 N Lincoln Blvd, Oklahoma City, OK 73105',
        email: 'jane.smith@okhouse.gov'
      }
    ];

    res.status(200).json(mockRepresentatives);
  } catch (error) {
    console.error('Error fetching representatives:', error);
    res.status(500).json({ message: 'Error fetching representatives' });
  }
} 