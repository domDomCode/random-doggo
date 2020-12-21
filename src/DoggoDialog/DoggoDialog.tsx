import React, { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import SlideTransition from './SlideTransition';

import { DoggoApiResponseInterface } from '../BreedList/BreedList';

import './DoggoDialog.scss';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedBreed: string;
}

const DoggoDialog: FC<Props> = ({ isOpen, setIsOpen, selectedBreed }) => {
  const baseUrlAPI = 'https://dog.ceo/api';

  useEffect(() => {
    fetchImage();
  }, [ selectedBreed ]);

  const [ imageUrl, setImageUrl ] = useState('');

  const fetchImage = () => {
    axios.get<DoggoApiResponseInterface>(generateBreedUrl())
      .then((response: AxiosResponse<DoggoApiResponseInterface>) => {
        setImageUrl(response.data.message);
      });
  };

  const generateBreedUrl = () => {
    const breedNameSplit = selectedBreed.split(' ');

    return breedNameSplit.length === 1
      ? `${baseUrlAPI}/breed/${breedNameSplit[0]}/images/random`
      : `${baseUrlAPI}/breed/${breedNameSplit[1]}/${breedNameSplit[0]}/images/random`;
  };

  return (
    <>
      <Dialog
        classes={{ root: 'DoggoDialog' }}
        open={isOpen}
        TransitionComponent={SlideTransition}
      >
        <DialogTitle classes={{ root: 'DoggoDialog__breed-name' }}>{selectedBreed}</DialogTitle>
        <DialogContent>
          <div className={'DoggoDialog__doggo-container'}>
            {imageUrl && <img src={imageUrl} alt={selectedBreed}/>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => fetchImage()}
          >
            Another one!!!
          </Button>
          <Button
            variant={'contained'}
            color={'secondary'}
            onClick={() => {
              setImageUrl('');
              setIsOpen(false);
            }}
          >
            Naah, I wanna see a different kind
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DoggoDialog;