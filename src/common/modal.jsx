import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
} from "@mui/material";

export default function CommonModal({
  isOpen,
  title,
  fields,
  onClose,
  onFieldChange,
  onSubmit,
  formValues = [],
  onEdit
}) {
  // Determine if the modal is in edit mode
  const isEditMode = formValues.length > 0;
  const [formData, setFormData] = useState(isEditMode ? formValues[0] : {});


  const handleButtonClick = () => {
    if (isEditMode) {
      onEdit(formData);  
    } else {
      onSubmit(formData); 
    }
  };
  useEffect(() => {
    if (isOpen && isEditMode) {
      setFormData(formValues[0]);
    }
  }, [isOpen, isEditMode, formValues]);

  const handleFieldChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onFieldChange(name, value);  
  };

  const handleCheckboxChange = (name, checkedValue, isChecked) => {
    let updatedValues = formData[name] || [];
    
    if (isChecked) {
      if (!updatedValues.includes(checkedValue)) {
        updatedValues.push(checkedValue);
      }
    } else {
      updatedValues = updatedValues.filter((val) => val !== checkedValue);
    }
    
    handleFieldChange(name, updatedValues);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        {fields.map((field, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            {field.type === "text" && (
              <TextField
                label={field.name}
                fullWidth
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
              />
            )}

            {field.type === "file" && (
              <div>
                <label htmlFor="file-input">{field.name}</label>
                <br />
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.files[0])
                  }
                />
              </div>
            )}

            {field.type === "dropdown" && (
              <FormControl fullWidth>
                <InputLabel>{field.name}</InputLabel>
                <Select
                  label={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                >
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {field.type === "radio" && (
              <RadioGroup
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
              >
                <InputLabel>{field.name}</InputLabel>
                {field.options.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            )}

            {field.type === "checkbox" && (
              <FormGroup>
                {field.options.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        checked={formData[field.name]?.includes(option) || false}
                        onChange={(e) =>
                          handleCheckboxChange(field.name, option, e.target.checked)
                        }
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>
            )}
          </div>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleButtonClick}
        >
          {isEditMode ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
