import { useContext } from "react"
import AppContext from "../context/AppContext"
import styled from "@mui/system/styled"
import Paper from "@mui/material/Paper"
import Grid2 from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import TextField from "@mui/material/TextField"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme?.palette?.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme?.typography?.body2,
  padding: theme?.spacing(1),
  textAlign: 'center',
  color: theme?.palette?.text?.secondary,
}));

const ItemTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(1),
  fontSize: '0.9rem',
}));

function NumberField(props) {
  const { name, value } = props
  const { setCameraOffset } = useContext(AppContext)

  function addValue(changeValue) {
    setCameraOffset((prev) => ({
      ...prev,
      [name]: prev[name] + changeValue,
    }))
  }

  return (
    <Item>
      <Grid2 container spacing={1}>
        <Grid2 item xs={6}>
          <ItemTitle>
            {name.toUpperCase()}
          </ItemTitle>
        </Grid2>
        <Grid2 item xs={1}>
          <IconButton onClick={() => addValue(-0.1)}>
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </Grid2>
        <Grid2 item xs={1}>
          <IconButton onClick={() => addValue(-0.01)}>
            <KeyboardArrowLeft />
          </IconButton>
        </Grid2>
        <Grid2 item xs={1.5}>
          <TextField
            value={value}
            margin="dense"
            type="number"
            InputProps={{
              inputProps: {
                style: { textAlign: 'center' },
              },
            }}
            onChangeCapture={(event) => {
              if (event.target.value === '') {
                changeValue(0.0);
              } else {
                changeValue(parseFloat(event.target.value));
              }
            }}
          />
        </Grid2>
        <Grid2 item xs={1}>
          <IconButton onClick={() => addValue(0.01)}>
            <KeyboardArrowRight />
          </IconButton>
        </Grid2>
        <Grid2 item xs={1}>
          <IconButton onClick={() => addValue(0.1)}>
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Grid2>
      </Grid2>
    </Item>
  )
}

export default NumberField
