import axios from 'axios';

const INATURALIST_API = 'https://api.inaturalist.org/v1';

export const fetchCommonPests = async () => {
  const commonSpecies = [
    'Phylloxera',
    'Locusta migratoria',
    'Plutella xylostella',
    'Bemisia tabaci',
    'Tuta absoluta',
  ];

  const species = commonSpecies[Math.floor(Math.random() * commonSpecies.length)];

  try {
    const response = await axios.get(`${INATURALIST_API}/observations`, {
      params: {
        q: species,
        per_page: 10,
        photos: true,
        order_by: 'observed_on',
      },
    });

    return response.data.results.map((obs) => ({
      id: obs.id,
      species: obs.taxon?.preferred_common_name || obs.taxon?.name,
      scientificName: obs.taxon?.name,
      location: {
        latitude: obs.geojson?.coordinates?.[1],
        longitude: obs.geojson?.coordinates?.[0],
      },
      image: obs.photos?.[0]?.url.replace('square', 'medium') || null,
      date: obs.observed_on,
      place: obs.place_guess,
      observer: obs.user?.login,
    }));
  } catch (error) {
    console.error('Error fetching common pests:', error);
    return [];
  }
};

export const fetchPestOccurrences = async (species) => {
  if (!species) return [];

  try {
    const response = await axios.get(`${INATURALIST_API}/observations`, {
      params: {
        q: species,
        per_page: 30,
        photos: true,
        order_by: 'observed_on',
      },
    });

    return response.data.results.map((obs) => ({
      id: obs.id,
      species: obs.taxon?.preferred_common_name || obs.taxon?.name,
      scientificName: obs.taxon?.name,
      location: {
        latitude: obs.geojson?.coordinates?.[1],
        longitude: obs.geojson?.coordinates?.[0],
      },
      image: obs.photos?.[0]?.url.replace('square', 'medium') || null,
      date: obs.observed_on,
      place: obs.place_guess,
      observer: obs.user?.login,
    }));
  } catch (error) {
    console.error('Error fetching pest occurrences:', error);
    return [];
  }
};

export const fetchPestDetails = async (species) => {
  if (!species) return { error: 'Species is required' };

  try {
    const response = await axios.get(`${INATURALIST_API}/observations`, {
      params: {
        q: species,
        per_page: 1,
        photos: true,
      },
    });

    const obs = response.data.results[0];
    if (!obs) return { error: 'No details found' };

    return {
      species: obs.taxon?.preferred_common_name || obs.taxon?.name,
      scientificName: obs.taxon?.name,
      wikipediaUrl: obs.taxon?.wikipedia_url || null,
      image: obs.photos?.[0]?.url.replace('square', 'medium') || null,
      rank: obs.taxon?.rank,
      kingdom: obs.taxon?.kingdom_name,
      phylum: obs.taxon?.phylum_name,
      class: obs.taxon?.class_name,
      order: obs.taxon?.order_name,
      family: obs.taxon?.family_name,
      genus: obs.taxon?.genus_name,
      description: obs.taxon?. wikipedia_summary || null,
    };
  } catch (error) {
    console.error('Error fetching pest details:', error);
    return { error: 'Failed to fetch details' };
  }
};

export const reportPest = async (pestData) => {
  throw new Error('Reporting pests not supported by iNaturalist API');
};
