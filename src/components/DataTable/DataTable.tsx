import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import{ Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {CharacterForm} from '../../components/CharacterForm';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 140 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
      field: 'comics_appeared_in',
      headerName: 'Appearances',
      type: 'number',
      width: 140,
    },
    {
      field: 'super_power',
      headerName: 'Super Power',
    //   description: 'This is the Drone Series.',
      sortable: false,
      width: 160,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];

  interface gridData{
    data:{
      id?:string;
    }
  }

export const DataTable =  () => {  
  let { characterData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = async() => {
    await server_calls.delete(`${gridData[0]}`)
    getData()
  }

  console.log(gridData) // a list of id's from checked rows

    return (
        <div style={{ height: 400, width: '100%' }}>
          <h2>Characters in Collection</h2>
          <DataGrid rows={characterData} 
						        columns={columns} 
						        pageSize={5} 
						        checkboxSelection 
						        onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
						        {...characterData}  
					          />
          <Button onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="error" onClick={deleteData}>Delete</Button>

          {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update A Character</DialogTitle>
          <DialogContent>
            <DialogContentText>Character id: {gridData[0]}</DialogContentText>
              <CharacterForm id={`${gridData[0]}`}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{backgroundColor: 'warning'}}>Cancel</Button>
            {/* <Button onClick={handleClose} color="primary">Done</Button>  */}
          </DialogActions>
        </Dialog>
        </div>
      );
}