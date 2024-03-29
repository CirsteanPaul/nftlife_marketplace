import React, { useEffect, useState } from 'react'
import Layout from '../../layout'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { AddNewCollectionContainer, InputForm, InputLine, InputLineWrapper, ListingButton, ListingButtonContainter, LogImage, MainPartContainer, PhotoInput, SelectForm, SelectionLine } from './styles'

import { useAppDispatch } from '../../store';
import { addNewCollectionActionAsync } from '../../store/actions/market-products-actions';
const categories = ['1','2'];
const types = ['1','2','3','4']
const Dashboard = () => {
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [amount, setAmount] = useState('');
    const [discordLink, setDiscordLink] = useState('');
    const [twitterLink, setTwitterLink] = useState('');
    const [imageUrl, setImageUrl] = useState<any>('');
    const [imageToUpload, setImageToUpload] = useState<File | null>(null);
    const [type, setType] = useState(types[0]);
    const [startDate, setStartDate] = useState(new Date());
    useEffect(() =>{
        if(!imageToUpload) return;
        const reader = new FileReader();
        reader.onloadend = function (e) {
            setImageUrl([reader.result])
          }
    },[imageToUpload])
    const handleSubmit = async (e : any) =>{
        e.preventDefault();
        dispatch(addNewCollectionActionAsync({name, price, category, amount, type, imageToUpload, startDate, discordLink, twitterLink}));
      }  
    return (
    <Layout>
        <AddNewCollectionContainer onSubmit={(e) =>handleSubmit(e)}>
            <MainPartContainer>
            <InputForm>

                <InputLine type="text" placeholder='Name:' onChange= {(e) => setName(e.target.value)}/>
                <InputLine type="text" placeholder='Price:' onChange= {(e) => setPrice(e.target.value)}/>
                <InputLine type="text" placeholder='Amount:' onChange= {(e) => setAmount(e.target.value)}/>
                <InputLineWrapper>
        <SelectionLine>
          Category:
          <SelectForm value={category} onChange={ (e) => setCategory(e.target.value)}>
            <option value={categories[0]}>Spot</option>
            <option value={categories[1]}>Raffle</option>
          </SelectForm>
          </SelectionLine>
          <SelectionLine>
          Type:
          <SelectForm value={type} onChange={(e) => setType(e.target.value)}>
            <option value={types[0]}>WL spot</option>
            <option value={types[1]}>Merch</option>
            <option value={types[2]}>Nft</option>
            <option value={types[3]}>Others</option>

          </SelectForm>
          </SelectionLine>
          { type === '1' && 
            <>
              <InputLine type="text" placeholder='Discord:' onChange= {(e) => setDiscordLink(e.target.value)}/>
              <InputLine type="text" placeholder='Twitter:' onChange= {(e) => setTwitterLink(e.target.value)}/>
            </>
          }   
          </InputLineWrapper>
      {category === '2' && <div style={{ alignSelf: 'center', zIndex: 1000}}><DatePicker minDate={new Date(Date.now())} selected={startDate} onChange={(date:Date) => setStartDate(date)} /> </div>}
        <PhotoInput type="file" onChange={(e) => setImageToUpload(e.target?.files?.length ? e.target.files[0] : null)} />
            </InputForm>
             {imageUrl !== '' ? <LogImage src = {imageUrl} /> : <LogImage src = 'assets/placeholder.png' />}

            </MainPartContainer>
            <ListingButtonContainter>
                <ListingButton type="submit" />
            </ListingButtonContainter>
        </AddNewCollectionContainer>
    </Layout>
  )
}

export default Dashboard