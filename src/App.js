import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#ccc"
  },
  table: {
    backgroundColor: "#999ca2",
  },
  buttonUpload: {
    backgroundColor: "#32a87b",
    '&:hover': {
      background: "#9687dd",
    },
    margin: 10,
    fontWeight: 600,
    color: '#111111'
  },
  buttonDownload: {
    backgroundColor: '#4287f5',
    '&:hover': {
      background: "#9687dd",
    },
    margin: 10,
    fontWeight: 600,
    color: '#111111'
  }
});

export default function App() {
  const classes = useStyles();
  let [file, setFile] = useState([]);

  const handleFile = (e) => {
    let data = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let inputFile = e.target.result;
      let rows = inputFile.split("\n");
      let newRows = rows
        .map(str => str.split(/\s+/).filter((el) => el !== ""))
        .filter((row, index) => index > 6);
      setFile(newRows);
      
    };
    reader.readAsText(data);
  };

  const downloader = (filename,text) => {
      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
  
      element.style.display = 'none';
      document.body.appendChild(element);
  
      element.click();
  
      document.body.removeChild(element);
  }
  
  const downloadInJSON = () => {
    let json = JSON.stringify(file);
    let filename = 'weather-data.txt'
    downloader(filename,json);
  }

  return (
    <div className={classes.root}>
      <input
        type="file"
        id="button-file"
        accept={'.txt'}
        multiple={false}
        onChange={(e) => handleFile(e)}
        hidden
      />
      <label htmlFor="button-file">
        <Button 
          variant="contained" 
          component="span" 
          className={classes.buttonUpload}>
          Upload
        </Button>
      </label> 
      <Button 
        variant="contained" 
        className={classes.buttonDownload}
        onClick={downloadInJSON}
      >
        Download
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Year</TableCell>
              <TableCell align="left">Month</TableCell>
              <TableCell align="left">Max Temp</TableCell>
              <TableCell align="left">Min Temp</TableCell>
              <TableCell align="left">AF</TableCell>
              <TableCell align="left">Rain</TableCell>
              <TableCell align="left">Sun</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left">celcius</TableCell>
              <TableCell align="left">celcius</TableCell>
              <TableCell align="left">days</TableCell>
              <TableCell align="left">millimetres</TableCell>
              <TableCell align="left">hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {file.map((row) => (
              <TableRow>
                {row.map((el) => (
                  <TableCell align="left">{el}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
