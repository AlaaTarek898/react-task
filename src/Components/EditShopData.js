import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Services/firebase.config";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import BasicModal from "./Map/MapComponent";
import Form from "./Layout/Form";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import MapContainer from "./Map/MapComponent";
import Autocomplete from "react-google-autocomplete";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};
const EditShopData = ({ id, name, code, location, phone }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [names, setnames] = useState(name);
  const [codes, setCodes] = useState(code);
  const [locations, setlocations] = useState(location);
  const [phones, setPhones] = useState(phone);

  const updateShop = async (e) => {
    e.preventDefault();

    try {
      const taskDocument = doc(db, "shopdata", id);

      await updateDoc(taskDocument, {
        Name: names,
        location: locations,
        code: codes,
        phone: phones,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Button onClick={handleOpen}>edite</Button>

      {
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <MapContainer />{" "}
            <Grid container spacing={2} marginY={2}>
              <Grid item xs="6">
                <Form.Controller>
                  <TextField
                    required
                    id="outlined-required"
                    hiddenLabel
                    defaultValue={names}
                    type="text"
                    Value={names}
                    variant="filled"
                    onChange={(e) => setnames(e.target.value)}
                  />
                </Form.Controller>
              </Grid>
              <Grid item xs={6}>
                <Form.Controller>
                  <TextField
                    required
                    id="outlined-required"
                    hiddenLabel
                    defaultValue={codes}
                    type="text"
                    Value={codes}
                    variant="filled"
                    onChange={(e) => setCodes(e.target.value)}
                  />
                </Form.Controller>
              </Grid>
              <Grid item xs={6}>
                <Form.Controller>
                  <TextField
                    required
                    id="outlined-required"
                    hiddenLabel
                    defaultValue={locations}
                    type="text"
                    Value={locations}
                    variant="filled"
                    onChange={(e) => setlocations(e.target.value)}
                  />
                </Form.Controller>
              </Grid>

              <Grid item xs={6}>
                <Form.Controller>
                  <TextField
                    required
                    id="outlined-required"
                    hiddenLabel
                    defaultValue={phones}
                    type="text"
                    Value={phones}
                    variant="filled"
                    onChange={(e) => setPhones(e.target.value)}
                  />
                </Form.Controller>
              </Grid>
            </Grid>
            <form>
              <Button
                type="submit"
                onClick={(e) => updateShop(e)}
                variant="contained"
              >
                Save
              </Button>
              <Button type="reset" onClick={handleClose}>
                close{" "}
              </Button>
            </form>
          </Box>
        </Modal>
      }
    </div>
  );
};

export default EditShopData;
