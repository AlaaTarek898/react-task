//import form react
import * as React from "react";
import { useState } from "react";

//import Mui
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Icon from "@mui/material/Icon";
//firebase
import { addDoc, collection, getDocs } from "firebase/firestore";
//components
import Form from "../Layout/Form";

import Buttoncomp from "../Button/Buttoncomp";
import MapContainer from "../Map/MapComponent";
import Autocomplete from "react-google-autocomplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function AddShop({ collectionRef }) {
  //shop state
  const [shopName, setshopName] = useState("");
  const [code, setCode] = useState("");
  const [location, setlocation] = useState("");
  const [phone, setPhone] = useState("");
  //handle modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //handle add shop
  const submitShop = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collectionRef, {
        Name: shopName,
        location: location,
        code: code,
        phone: phone,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* modal button */}
      <Buttoncomp handleaction={handleOpen}>
        <Icon color="primary" sx={{ fontSize: 30 }}>
          add_circle
        </Icon>
        Add Shop
      </Buttoncomp>
      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* form */}

          <form onSubmit={submitShop}>
            <MapContainer />
            <Grid container spacing={2} marginY={2}>
              <Grid item xs={6}>
                <Form.Controller>
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    defaultValue=""
                    type="text"
                    Value={shopName}
                    onChange={(e) => setshopName(e.target.value)}
                  />
                </Form.Controller>
              </Grid>
              <Grid item xs={6}>
                <Form.Controller>
                  <TextField
                    required
                    id="outlined-required"
                    label="Code"
                    defaultValue=""
                    type="text"
                    Value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </Form.Controller>
              </Grid>
              <Grid item xs={6}>
                <Form.Controller>
                  <TextField
                    required
                    id="outlined-required"
                    label="Location"
                    defaultValue=""
                    type="text"
                    Value={location}
                    onChange={(e) => setlocation(e.target.value)}
                  />
                </Form.Controller>
              </Grid>
              <Grid item xs={6}>
                <Form.Controller>
                  <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    defaultValue=""
                    type="text"
                    Value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Controller>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item marginY={2}>
                <Button type="submit" variant="contained">
                  Save{" "}
                </Button>
              </Grid>
              <Grid item marginY={2}>
                <Button
                  type="reset"
                  variant="outlined"
                  color="error"
                  onClick={handleClose}
                >
                  Cancel{" "}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
}
export default AddShop;
