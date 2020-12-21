import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button } from '@material-ui/core';

import './BreedList.scss';
import DoggoDialog from '../DoggoDialog/DoggoDialog';

export interface DoggoApiResponseInterface {
  message: any;
  status: string;
}

const BreedList = () => {
  const baseUrlAPI = 'https://dog.ceo/api';

  const [ breedsList, setBreedsList ] = useState<string[]>([]);

  useEffect(() => {
    axios.get<DoggoApiResponseInterface>(`${baseUrlAPI}/breeds/list/all`)
      .then((response: AxiosResponse<DoggoApiResponseInterface>) => {
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

  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ selectedBreed, setSelectedBreed ] = useState<string>('');

  const handleBreedClick = (breed: string) => {
    setSelectedBreed(breed);
    setIsDialogOpen(true);
  };

  return (
    <div className={'BreedList'}>
      {breedsList.length && breedsList.map(breed => (
        <Button
          classes={{ root: 'BreedList__btn' }}
          variant={'outlined'}
          onClick={() => handleBreedClick(breed)}
        >
          {breed}
        </Button>
      ))}
      {selectedBreed &&
      <DoggoDialog selectedBreed={selectedBreed} isOpen={isDialogOpen}
                   setIsOpen={setIsDialogOpen}/>}
    </div>
  );
};

export default BreedList;