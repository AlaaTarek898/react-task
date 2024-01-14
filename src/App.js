import "./App.css";
import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { db } from "./Services/firebase.config";
import Container from "@mui/material/Container";
import Buttoncomp from "./Components/Button/Buttoncomp";
import Icon from "@mui/material/Icon";
import MapContainer from "./Components/Map/MapComponent";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

import EditShopData from "./Components/EditShopData.js";

import AddShop from "./Components/AddShop/AddShop";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
// import MapComponent from "./Components/Map/MapComponent";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function App() {
  const [shop, setShop] = useState([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const collectionRef = collection(db, "shopdata");
  useEffect(() => {
    const getshop = async () => {
      await getDocs(collectionRef)
        .then((shop) => {
          let shopData = shop.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setShop(shopData);
        })
        .catch((err) => console.log(err));
    };
    getshop();
  }, []);
  //Delete Shop
  const deleteShop = async (id) => {
    try {
      window.confirm("Are you sure you want to delete");
      const documentsRef = doc(db, "shopdata", id);
      await deleteDoc(documentsRef);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <MapContainer />
      <div className="container">
        <h3>Shops Manegment:</h3>

        <AddShop collectionRef={collectionRef} />
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size="large"
          aria-label=" customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>shop name</StyledTableCell>
              <StyledTableCell align="right">code</StyledTableCell>
              <StyledTableCell align="right">location</StyledTableCell>
              <StyledTableCell align="right">phone</StyledTableCell>
              <StyledTableCell align="right">action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shop.map((row) => (
              <StyledTableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Name}
                </TableCell>
                <StyledTableCell align="right">{row.code}</StyledTableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">
                  <DropdownButton id="dropdown-basic-button" title=":">
                    <Dropdown.Item href="#/action-1">
                      <Buttoncomp
                        handleaction={() => deleteShop(row.id)}
                        variant={"outlined"}
                        color={"error"}
                      >
                        Delete
                      </Buttoncomp>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <EditShopData
                        id={row.id}
                        name={row.Name}
                        code={row.code}
                        location={row.location}
                        phone={row.phone}
                      />
                    </Dropdown.Item>
                  </DropdownButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
