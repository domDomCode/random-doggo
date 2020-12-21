import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button } from '@material-ui/core';

import './BreedList.scss';

export interface BreedsListResponseInterface {
  message: string[];
  status: string;
}

const BreedList = () => {
  const baseUrlAPI = 'https://dog.ceo/api';

  const [ breedsList, setBreedsList ] = useState<string[]>([]);

  useEffect(() => {
    axios.get<BreedsListResponseInterface>(`${baseUrlAPI}/breeds/list/all`)
      .then((response: AxiosResponse<BreedsListResponseInterface>) => {
        generateSubBreeds(response.data.message);
        setBreedsList(generateSubBreeds(response.data.message));
      });
  }, []);

  const generateSubBreeds = (breedList: any): string[] => { //TODO sort out any
    return Object.keys(breedList).reduce((acc: string[], breed: string): string[] => {
      let breedSubtype: string[];

      breedList[breed].length
        ? breedSubtype = breedList[breed].map((subtype: string) => `${subtype} ${breed}`)
        : breedSubtype = [ breed ];

      return [
        ...acc,
        ...breedSubtype
      ];
    }, []);
  };

  const handleClick = () => {

  };

  return (
    <div className={'BreedList'}>
      {breedsList.length && breedsList.map(breed => (
        <Button
          classes={{ root: 'BreedList__btn' }}
          variant={'outlined'}
          onClick={() => handleClick()}
        >
          {breed}
        </Button>
      ))}
    </div>
  );
};

export default BreedList;