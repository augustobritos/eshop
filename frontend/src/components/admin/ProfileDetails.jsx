import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ProfileDetails = ({ userData, isEditing, onInputChange, onEditToggle, onSave }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h4" gutterBottom sx={{ marginTop: 5, textAlign: "center" }}>
          Mi Información
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <div style={{ width: "100%" }}>
          <TextField
            label="Name"
            name="name"
            value={userData.user.name}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Email"
            name="email"
            value={userData.user.email}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            sx={{ marginBottom: 2 }}
          />

          {isEditing && (
            <TextField
              type="password"
              label="Password"
              name="password"
              value={userData.user.password}
              onChange={onInputChange}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onEditToggle} variant="contained" color="primary" sx={{ marginRight: 2 }}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>

            {isEditing && (
              <Button onClick={onSave} variant="contained" color="primary">
                Save
              </Button>
            )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProfileDetails;
