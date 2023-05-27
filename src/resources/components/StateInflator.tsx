import { ReactElement, useEffect, useState } from 'react'
import { fetchCountries, fetchSeasons } from '../../api'
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function StateInflator({children}: { children: ReactElement }) {
  const key = useSelector((state: RootState) => {
    return state.user.key;
  });
  const countries = useSelector((state: RootState) => {
    return state.countries.list;
  });
  const seasons = useSelector((state: RootState) => {
    return state.seasons.years;
  });
  const redirect = useNavigate();

  const [canFetch, setCanFetch] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  
  useEffect(() => {
    if (key === '' || key === undefined) {
      redirect('/');
    } else if (
      !countries.length || !seasons.length
    ) {
      setCanFetch(true);
    }
  }, [key])
  
  useEffect(() => {
    if (canFetch) {
      const asyncFetch = async () => {
        if (!countries.length) await fetchCountries();
        if (!seasons.length) await fetchSeasons();
      }
      try {
        asyncFetch();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      }
    }
  }, [canFetch]);

  return (
    <>
      {error && <Alert>{error}</Alert>}
      {children}
    </>
  )
}

export default StateInflator